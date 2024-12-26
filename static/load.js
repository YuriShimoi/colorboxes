const load_container = document.getElementById('load-container');
const load_input = document.getElementById('load-url');

function copyUrlToCopyPaste() {
    let copyText = load_input;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
}

function getUrlCode() {
    if(load_input.value) return decodeURI(load_input.value.split('?code=')[1]);
    return decodeURI(window.location.href.split('?code=')[1]);
}

function checkHasCode() {
    return Boolean(window.location.href.split('?code=')[1]);
}

function loadUrlCode(code=null) {
    enableStage('load');
    showControls();
    let new_table = Table.decode(code?? getUrlCode());

    TableManager.clearPlot();

    let table_container = document.createElement('TABLE');
    table_container.classList.add('table-container');
    load_container.appendChild(table_container);

    new_table.container = table_container;
    TableManager.setTarget(new_table);
    TableManager.plotTable();
}

if(checkHasCode()) {
    load_input.value = window.location.href;
    enableStage('load');
    showControls();
    loadUrlCode();
}