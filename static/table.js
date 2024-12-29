class Box {
    static CACHE = {};

    static RED = new Box('1', '#fa1644', '#7a1529');
    static BLUE = new Box('2', '#2773f5', '#19428a');
    static GREEN = new Box('3', '#1ab82a', '#17661f');
    static YELLOW = new Box('4', '#f7dc2d', '#917e20');

    static WALL = new Box('0', '#d2d2d2', '#d2d2d2', false);

    constructor(code, color, shadow, can_move=true, can_select=true) {
        if(code === undefined) return;

        this.code = code;
        this.color = color;
        this.shadow = shadow;
        this.can_move = can_move;
        this.can_select = can_move? can_select: false;

        if(!(code in Box.CACHE)) Box.CACHE[code] = this;
    }

    isEqual(outer_box, ignore_multi=false) {
        if(outer_box instanceof Box)
            return Box.compare(this.code, outer_box.code, ignore_multi);
        else
            return Box.compare(this.code, String(outer_box), ignore_multi);
    }

    static compare(code1, code2, ignore_multi=false) {
        [code1, code2] = [String(code1), String(code2)];
        if(code1 == code2) return true;
        if(ignore_multi) return false;

        if(MultipleBox.isInstance(code1)) {
            return MultipleBox.includes(code2, code1);
        }
        
        if(MultipleBox.isInstance(code2)) {
            return MultipleBox.includes(code1, code2);
        }

        return false;
    }

    static Multi(...boxes) {
        return new MultipleBox(...boxes);
    }

    static fromCode(code) {
        if(code in Box.CACHE) return Box.CACHE[code];
        
        if(MultipleBox.isInstance(code)) {
            return new MultipleBox(...code.split(MultipleBox._sep_));
        }

        return null;
    }
}

class MultipleBox extends Box {
    static _sep_ = '%';

    constructor(...codes) {
        super();

        codes = codes.map(c => c instanceof Box? c.code: String(c));
        this.code = codes.join(MultipleBox._sep_);
        this.boxes = codes;
        this.can_move = true;
        this.can_select = false;
        this.setRadialColors(codes);
    }

    setRadialColors(codes) {
        const radial = (colors) => {
            const deg = 360 / colors.length;
            const grad = 4;
            const color_list = colors.reduce((p, v, i) => `${p}${v} ${deg*i+grad-16}deg ${deg*(i+1)-grad-16}deg,`, '').slice(0, -1);
            return `conic-gradient(from -29deg, ${color_list}, ${colors[0]} ${344+grad}deg)`;
        };
        const stripe_effect = 'repeating-linear-gradient(-45deg, #00000022 0 8px, transparent 8px 16px)';

        this.color = radial(codes.map(c => Box.CACHE[c].color));
        this.shadow = stripe_effect + ', ' + radial(codes.map(c => Box.CACHE[c].shadow));
    }

    add(...codes) {
        codes = codes.map(c => c instanceof Box? c.code: String(c));
        this.boxes = [...new Set([...this.boxes, ...codes])];
        this.code = this.boxes.join(MultipleBox._sep_);
        this.setRadialColors(this.boxes);
    }

    remove(...codes) {
        codes = codes.map(c => c instanceof Box? c.code: String(c));
        this.boxes = this.boxes.filter(c => !codes.includes(c));
        this.code = this.boxes.join(MultipleBox._sep_);
        this.setRadialColors(this.boxes);
    }

    includes(code) {
        return this.boxes.includes(code instanceof Box? code.code: String(code));
    }

    static isInstance(code) {
        return code.includes(MultipleBox._sep_);
    }

    static includes(code, multi_code) {
        multi_code = multi_code instanceof MultipleBox? MultipleBox.code: String(multi_code);
        return multi_code.split(MultipleBox._sep_).includes(code instanceof Box? code.code: String(code));
    }
}

class Table {
    static _GEN_ID_ = 0;
    
    container = null;
    mapping_aux = {};

    constructor(size_x, size_y, mapping=null, solution_mapping=null, modifiers=[]) {
        this.id = Table._GEN_ID_++;
        this.mapping = this.fitToRectangle(size_x, size_y, mapping);
        this.solution_mapping = solution_mapping?? {};
        this.modifiers = modifiers;
        this.buildAuxiliarMapping();
    }

    fitToRectangle(size_x, size_y, mapping) {
        if(mapping === null) return Table.newRectangle(size_x, size_y);
        else {
            let new_mapping = Table.newRectangle(size_x, size_y);
            return Table.mergeMappings(new_mapping, mapping, true);
        }
    }

    buildAuxiliarMapping() {
        if(this.mapping === null) return;

        this.mapping_aux = {};
        for(let map_x in this.mapping) {
            for(let map_y in this.mapping[map_x]) {
                if(this.mapping[map_x][map_y] !== null) {
                    this.mapping_aux[Table.formatPositionToIndex(map_x, map_y)] = this.mapping[map_x][map_y];
                }
            }
        }
    }

    mappingCopy() {
        let copy = Table.newRectangle(this.mapping.length, this.mapping[0].length);
        return Table.mergeMappings(copy, Table.mapFromObject(this.mapping_aux));
    }

    mappingAuxCopy() {
        return {...this.mapping_aux};
    }

    matchWithSolution(mapping) {
        let matches = [];
        for(let index in this.solution_mapping) {
            if(this.solution_mapping[index].isEqual(mapping[index], true)) {
                matches.push(index);
            }
        }
        return matches;
    }

    encode() {
        let codestr = `${this.modifiers.join('')}+`;
        codestr += `${this.mapping.length}*${this.mapping[0].length}+`;
        let firstof = true;
        for(let box in this.mapping_aux) {
            if(!firstof) codestr += '$';
            firstof = false;
            codestr += `${box}*${this.mapping_aux[box].code}`;
        }
        codestr += '+';
        firstof = true;
        for(let sol in this.solution_mapping) {
            if(!firstof) codestr += '$';
            firstof = false;
            codestr += `${sol}*${this.solution_mapping[sol].code}`;
        }

        return encodeURI(codestr);
    }

    genCopies() {
        this.aux_copy = this.mappingAuxCopy();
        this.mapping_copy = this.mappingCopy();
    }

    moveBox(boxCode, movement) {
        const [lenx, leny] = [this.mapping_copy.length, this.mapping_copy[0].length];
        let new_mapping = {};
        
        let boxes = this.container.getElementsByTagName(`span`);
        for(let box of boxes) {
            let box_code = box.getAttribute('box-code');
            let box_index = box.getAttribute('table-pos');
            let [pos_x, pos_y] = Table.decodeIndexToPosition(box_index);

            let map_index = box_index;
            if(Box.compare(box_code, boxCode)) {
                let new_x = Number(pos_x) + movement[0];
                let new_y = Number(pos_y) + movement[1];
                if(new_x >= 0 && new_x < lenx && new_y >= 0 && new_y < leny) {
                    map_index = Table.formatPositionToIndex(new_x, new_y);
                }
                else if(this.modifiers.includes(MODIFIER.PORTAL)) {
                    let port_x = (new_x + lenx) % lenx;
                    let port_y = (new_y + leny) % leny;
                    map_index = Table.formatPositionToIndex(port_x, port_y);
                }
            }

            if(map_index in new_mapping) new_mapping[map_index].push(box_code);
            else new_mapping[map_index] = [box_code];
        }

        while(Object.values(new_mapping).filter(mlist => mlist.length > 1).length > 0) {
            for(let index in new_mapping) {
                if(new_mapping[index].length > 1) {
                    let pos = Table.decodeIndexToPosition(index);
                    let prev_pos = [Number(pos[0]) + (movement[0]*-1), Number(pos[1]) + (movement[1]*-1)];
                    let prev_index = Table.formatPositionToIndex(prev_pos[0], prev_pos[1]);
                    let prev_code = this.aux_copy[prev_index].code;

                    new_mapping[index].splice(new_mapping[index].indexOf(prev_code), 1);
                    if(prev_index in new_mapping) new_mapping[prev_index].push(prev_code);
                    else new_mapping[prev_index] = [prev_code];
                }
            }
        }
        this.aux_copy = {};
        for(let index in new_mapping) {
            new_mapping[index] = new_mapping[index][0];
            this.aux_copy[index] = Box.fromCode(new_mapping[index]);
        }

        return new_mapping;
    }

    static decode(codestr) {
        codestr = decodeURI(codestr);
        let [modifiers, size, boxes, solutions] = codestr.split('+');
        size = size.split('*');
        size = [Number(size[0]), Number(size[1])];

        let boxes_decode = {};
        for(let box of boxes.split('$')) {
            let [pos, code] = box.split('*');
            boxes_decode[pos] = Box.fromCode(code);
        }

        let solutions_decode = {};
        for(let sol of solutions.split('$')) {
            let [pos, code] = sol.split('*');
            solutions_decode[pos] = Box.fromCode(code);
        }

        return new Table(size[0], size[1], Table.mapFromObject(boxes_decode), solutions_decode, modifiers.split(''));
    }

    static formatPositionToIndex(px, py) {
        return `${px}-${py}`;
    }

    static decodeIndexToPosition(index) {
        return index.split('-').map(p => parseInt(p));
    }

    static newRectangle(size_x, size_y) {
        return new Array(size_x).fill(null).map(_ => new Array(size_y).fill(null));
    }

    static mergeMappings(mapping1, mapping2, superposed=false) {
        let max_x = mapping1.length;
        if(!superposed && mapping2.length > mapping1.length) max_x = mapping2.length;
        let max_y = mapping1[0].length;
        if(!superposed && mapping2[0].length > mapping1[0].length) max_y = mapping2[0].length;

        let new_mapping = Table.newRectangle(max_x, max_y);
        for(let pos_x in new_mapping) {
            for(let pos_y in new_mapping[pos_x]) {
                try {
                    let new_value = superposed?
                        mapping1[pos_x][pos_y]??mapping2[pos_x][pos_y]
                      : mapping2[pos_x][pos_y]??mapping1[pos_x][pos_y];
                      if(new_value) new_mapping[pos_x][pos_y] = new_value;
                }
                catch {}
            }
        }
        return new_mapping;
    }

    static mapFromObject(obj_map) {
        let new_mapping = Table.newRectangle(1, 1);
        for(let index in obj_map) {
            let [pos_x, pos_y] = Table.decodeIndexToPosition(index);
            if(!new_mapping[pos_x]) new_mapping[pos_x] = new Array(0);
            new_mapping[pos_x][pos_y] = obj_map[index];
        }
        return new_mapping;
    }
}

class TableManager {
    static SELECTED_BOX = null;
    
    static target_table = null;
    static victory_fuction = () => null;

    static setTarget(table) {
        if(table instanceof Table) table = [table];
        TableManager.target_table = table;
        for(const tbl of table) tbl.genCopies();
        TableManager.victory_fuction = () => {};
    }

    static clearPlot() {
        if(!TableManager.target_table) return;
        for(const table of TableManager.target_table) {
            if(table.container) table.container.remove();
        }
    }

    static clearSelected() {
        TableManager.SELECTED_BOX = null;
        for(const table of TableManager.target_table) {
            let boxes = table.container.getElementsByTagName('span');
            for(let box of boxes) {
                box.classList.remove('selected');
            }
        }
    }

    static selectBox(code) {
        if(Box.fromCode(code).can_move && !Box.compare(code, TableManager.SELECTED_BOX)) {
            TableManager.clearSelected();
            TableManager.SELECTED_BOX = code;
            for(const table of TableManager.target_table) {
                let boxes = table.container.getElementsByTagName('span');
                for(let box of boxes) {
                    if(Box.compare(code, box.getAttribute('box-code'))) box.classList.add('selected');
                }
            }
        }
    }

    static runMove(direction) {
        if(TableManager.SELECTED_BOX === null) return;
        let movement = {
            'up': [-1, 0],
            'down': [1, 0],
            'left': [0, -1],
            'right': [0, 1]
        }[direction];

        for(let tind in TableManager.target_table) {
            const table = TableManager.target_table[tind];
            let new_mapping = table.moveBox(TableManager.SELECTED_BOX, movement);
            TableManager.updatePlot(tind, new_mapping);
        }

        TableManager.checkVictory();
    }

    static plotTable(reset_selected=false) {
        if(reset_selected) TableManager.SELECTED_BOX = null;

        for(const table of TableManager.target_table) {
            for(let pos_x in table.mapping) {
                let table_row = document.createElement('TR');
                for(let pos_y in table.mapping[pos_x]) {
                    let table_tile = document.createElement('TD');
                    
                    let index = Table.formatPositionToIndex(pos_x, pos_y);
                    if(table.mapping_aux[index]) {
                        let tile_box = TableManager.newBoxElement(index, table.mapping_aux[index]);
                        table_tile.appendChild(tile_box);
                    }
                    if(table.solution_mapping[index]) {
                        table_tile.setAttribute('tile-code', table.solution_mapping[index].code);
                        table_tile.classList.add('table-tile');
                        const isMulti = table.solution_mapping[index] instanceof MultipleBox;
                        table_tile.style.setProperty('background', table.solution_mapping[index].shadow, isMulti? 'important': '');
                    }
                    
                    table_row.appendChild(table_tile);
                }
                table.container.appendChild(table_row);
            }
            if(table.modifiers.includes(MODIFIER.PORTAL) && !table.container.classList.contains('tbl-portal')) {
                table.container.classList.add('tbl-portal');
            }
        }
        TableManager.checkVictory();
    }

    static newBoxElement(index, box) {
        let tile_box = document.createElement('SPAN');
        tile_box.setAttribute('table-pos', index);
        tile_box.setAttribute('box-code', box.code);
        tile_box.classList.add('table-box');

        tile_box.style.setProperty('background', box.color);
        if(box.isEqual(TableManager.SELECTED_BOX)) tile_box.classList.add('selected');
        if(box.can_select) tile_box.onclick = () => {
            TableManager.selectBox(box.code);
        };

        return tile_box;
    }

    static updatePlot(index, new_mapping) {
        const table = TableManager.target_table[index];
        let boxes = table.container.getElementsByTagName('span');
        for(let index=boxes.length-1; index >= 0; index--) {
            boxes[index].remove();
        }

        let table_rows = table.container.getElementsByTagName('tr');
        for(let pos_x=0; pos_x < table_rows.length; pos_x++) {
            let table_boxes = table_rows[pos_x].getElementsByTagName('td');
            for(let pos_y=0; pos_y < table_boxes.length; pos_y++) {
                let index = Table.formatPositionToIndex(pos_x, pos_y);
                if(index in new_mapping) {
                    table_boxes[pos_y].appendChild(TableManager.newBoxElement(index, Box.fromCode(new_mapping[index])));
                }
            }
        }
    }

    static checkVictory() {
        let match_amount = 0;
        for(const table of TableManager.target_table) {
            let matches = table.matchWithSolution(table.aux_copy);
            let boxes = table.container.getElementsByTagName('span');
            for(let box of boxes) {
                if(matches.includes(box.getAttribute('table-pos'))) {
                    box.classList.add('highlight');
                }
                else {
                    box.classList.remove('highlight');
                }
            }

            if(matches.length === Object.values(table.aux_copy).filter(b => b.can_move).length) {
                match_amount++;
            }
        }
        if(match_amount >= TableManager.target_table.length) {
            setTimeout(() => {
                TableManager.victory_fuction();
            }, 10);
        }
    }
}