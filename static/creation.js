const creation_tools = document.getElementById('create-tools');
const creation_table = document.getElementById('create-table');
const creation_palette = document.getElementById('create-palette');

var c_width = 5;
var c_height = 5;
var c_table = new Table(c_height, c_width);
var c_selected = null;

function reloadCreateTable() {
    TableManager.clearPlot();
    c_table = new Table(c_height, c_width, c_table.mapping, c_table.solution_mapping, c_table.modifiers);

    let table_container = document.createElement('TABLE');
    table_container.onclick = (event) => paintTableTile(event.target);
    table_container.classList.add('table-container');
    creation_table.appendChild(table_container);

    c_table.container = table_container;
    TableManager.setTarget(c_table);
    TableManager.plotTable();
}

function resizeCreateTable(new_width, new_heigth) {
    c_width = new_width;
    c_height = new_heigth;
    reloadCreateTable();
}

function updateCreateSize() {
    let [width_input, height_input] = creation_tools.getElementsByTagName('input');
    let new_width = Number(width_input.value);
    if(new_width < 1) new_width = 1;
    if(new_width > 13) new_width = 13;
    width_input.value = new_width;
    
    let new_height = Number(height_input.value);
    if(new_height < 1) new_height = 1;
    if(new_height > 13) new_height = 13;
    height_input.value = new_height;

    resizeCreateTable(new_width, new_height);
}

function updatePortalModifier(element) {
    if(c_table.modifiers.includes(MODIFIER.PORTAL) && !element.checked) {
        c_table.modifiers.splice(c_table.modifiers.indexOf(MODIFIER.PORTAL), 1);
        reloadCreateTable();
    }
    if(!c_table.modifiers.includes(MODIFIER.PORTAL) && element.checked) {
        c_table.modifiers.push(MODIFIER.PORTAL);
        reloadCreateTable();
    }
}

function exportCreateTable() {
    let export_code = c_table.encode();
    document.getElementById('load-url').value = `${window.location.origin}${window.location.pathname}?code=${export_code}`;
    loadUrlCode(export_code);
}

function selectObject(element) {    
    let objs = creation_palette.getElementsByTagName('span');
    for(let obj=0; obj < objs.length; obj++) {
        objs[obj].classList.remove('selected');
    }
    if(c_selected !== element) {
        element.classList.add('selected');
        c_selected = element;
    }
    else c_selected = null;
}

function findTablePosition(element) {
    if(element.tagName !== 'TD') {
        if(element.parentElement.tagName !== 'TD') return null;
        else element = element.parentElement;
    }

    let all_tiles = creation_table.getElementsByTagName('td');
    for(let t=0; t < all_tiles.length; t++) {
        if(all_tiles[t] === element) return [
            Math.floor(Number(t) / c_width),
            Number(t) % c_width
        ];
    }

    return null;
}

function paintTableTile(element) {
    let pos = findTablePosition(element);
    if(pos && c_selected) {
        const code = c_selected.getAttribute('code');
        const index = Table.formatPositionToIndex(pos[0], pos[1]);
        const map = c_selected.getAttribute('type') === 'box'? c_table.mapping[pos[0]][pos[1]]: c_table.solution_mapping[index];

        let new_value = -1;
        if(!map) { // table selection is empty
            new_value = Box.CACHE[code];
        }
        else {
            if(map.code === code) { // same Box in palette and in table selection
                new_value = null;
            }
            else if(map.isEqual(code)) { // Box in palette is in table MultiBox selection
                map.remove(code);
            }
            else if(Box.CACHE[code].can_move) { // Box in palette not equal nor in table selection nor is imovable
                if(map instanceof MultipleBox) {
                    map.add(code);
                }
                else if(Box.CACHE[map.code].can_move) { // table selection is not a MultiBox nor an imovable Box
                    new_value = Box.Multi(map, code);
                }
            }
        }

        if(new_value !== -1) {
            if(c_selected.getAttribute('type') === 'box') {
                c_table.mapping[pos[0]][pos[1]] = new_value;
            }
            else {
                if(new_value === null) delete c_table.solution_mapping[index];
                else c_table.solution_mapping[index] = new_value;
            }
        }

        reloadCreateTable();
    }
}

function bindPalette() {
    creation_palette.innerHTML = new Array(9).fill('<span></span>').join('');

    let [b_red, t_red, b_green, t_green, b_blue, t_blue, b_yellow, t_yellow, wall] = creation_palette.getElementsByTagName('span');
    b_red.style.background = Box.RED.color;
    b_red.setAttribute('code', '1');
    b_red.setAttribute('type', 'box');
    b_red.onclick = () => selectObject(b_red);
    t_red.style.background = Box.RED.shadow;
    t_red.setAttribute('code', '1');
    t_red.setAttribute('type', 'tile');
    t_red.onclick = () => selectObject(t_red);

    b_green.style.background = Box.GREEN.color;
    b_green.setAttribute('code', '3');
    b_green.setAttribute('type', 'box');
    b_green.onclick = () => selectObject(b_green);
    t_green.style.background = Box.GREEN.shadow;
    t_green.setAttribute('code', '3');
    t_green.setAttribute('type', 'tile');
    t_green.onclick = () => selectObject(t_green);

    b_blue.style.background = Box.BLUE.color;
    b_blue.setAttribute('code', '2');
    b_blue.setAttribute('type', 'box');
    b_blue.onclick = () => selectObject(b_blue);
    t_blue.style.background = Box.BLUE.shadow;
    t_blue.setAttribute('code', '2');
    t_blue.setAttribute('type', 'tile');
    t_blue.onclick = () => selectObject(t_blue);

    b_yellow.style.background = Box.YELLOW.color;
    b_yellow.setAttribute('code', '4');
    b_yellow.setAttribute('type', 'box');
    b_yellow.onclick = () => selectObject(b_yellow);
    t_yellow.style.background = Box.YELLOW.shadow;
    t_yellow.setAttribute('code', '4');
    t_yellow.setAttribute('type', 'tile');
    t_yellow.onclick = () => selectObject(t_yellow);

    wall.style.background = Box.WALL.color;
    wall.setAttribute('code', '0');
    wall.setAttribute('type', 'box');
    wall.onclick = () => selectObject(wall);
}

bindPalette();