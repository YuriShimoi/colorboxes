class Box {
    static CACHE = {};

    static RED = new Box('1', '#fa1644', '#7a1529');
    static BLUE = new Box('2', '#2773f5', '#19428a');
    static GREEN = new Box('3', '#1ab82a', '#17661f');
    static YELLOW = new Box('4', '#f7dc2d', '#917e20');

    static WALL = new Box('0', '#d2d2d2', '#d2d2d2', false);

    constructor(code, color, shadow, can_move=true) {
        this.code = code;
        this.color = color;
        this.shadow = shadow;
        this.can_move = can_move;

        Box.CACHE[code] = this;
    }

    isEqual(outer_box) {
        return String(this.code) === String(outer_box.code); 
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
            if(this.solution_mapping[index] === mapping[index]) {
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
            if(box_code === boxCode) {
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
            this.aux_copy[index] = Box.CACHE[new_mapping[index]];
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
            boxes_decode[pos] = Box.CACHE[code];
        }

        let solutions_decode = {};
        for(let sol of solutions.split('$')) {
            let [pos, code] = sol.split('*');
            solutions_decode[pos] = Box.CACHE[code];
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
        if(Box.CACHE[code].can_move) {
            TableManager.clearSelected();
            TableManager.SELECTED_BOX = code;
            for(const table of TableManager.target_table) {
                let boxes = table.container.querySelectorAll(`[box-code="${code}"]`);
                for(let box of boxes) {
                    box.classList.add('selected');
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
                        table_tile.style.background = table.solution_mapping[index].shadow;
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

        tile_box.style.background = box.color;
        if(box.code === TableManager.SELECTED_BOX) tile_box.classList.add('selected');
        tile_box.onclick = () => {
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
                    table_boxes[pos_y].appendChild(TableManager.newBoxElement(index, Box.CACHE[new_mapping[index]]));
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