const level_container = document.getElementById('level-list');
var LAST_LEVEL = 0;
var SELECTED_LEVEL = 0;

function enableStage(stg_name) {
    let stages = document.getElementsByClassName('main-stage');
    let enb_stage = document.getElementById(`${stg_name}-stage`);
    if(!enb_stage) return;
    for(let stg of stages) {
        if(!stg.classList.contains('invisible')) {
            stg.classList.add('invisible');
        }
    }
    enb_stage.classList.remove('invisible');
}

function showControls() {
    document.getElementById('controls').hidden = false;
    CONTROL_ENABLED = true;
}

function hideControls() {
    document.getElementById('controls').hidden = true;
    CONTROL_ENABLED = false;
}

function openMenu() {
    enableStage('menu');
    hideControls();
    hideOverlay();

    let levels = level_container.getElementsByTagName('button');
    for(let lvl=0; lvl < levels.length; lvl++) {
        if(Number(lvl) <= LAST_LEVEL) levels[lvl].removeAttribute('disabled');
        else break;
    }
}

function skipTutorial() {
    localStorage.setItem('already-start', 'true');
    openMenu();
}

function nextLevel() {
    if(LEVEL_LIST[SELECTED_LEVEL+1]) {
        SELECTED_LEVEL++;
        reloadLevel();
    }
    else {
        openMenu();
    }
}

function openGameStage() {
    reloadLevel();
    enableStage('game');
    showControls();
}

function formatLevelString(level) {
    if(String(level).length < 2) return '0' + level;
    else return String(level);
}

function reloadLevel() {
    document.getElementById('level-id').innerHTML = 'L - ' + formatLevelString(SELECTED_LEVEL+1);

    hideOverlay();
    let gm_element = document.getElementById('game-container');
    plotTable(gm_element, LEVEL_LIST[SELECTED_LEVEL], () => {
        openOverlay(false);
        LAST_LEVEL = SELECTED_LEVEL+1;
        localStorage.setItem('last-level', LAST_LEVEL);
    });
}

function openOverlay(default_overlay=true) {
    if(default_overlay) {
        document.getElementById('level-complete').setAttribute('hidden', true);
        document.getElementById('next-level').setAttribute('hidden', true);
        document.getElementById('level-pause').removeAttribute('hidden');
        document.getElementById('resume-level').removeAttribute('hidden');
    }
    else {
        document.getElementById('level-complete').removeAttribute('hidden');
        document.getElementById('next-level').removeAttribute('hidden');
        document.getElementById('level-pause').setAttribute('hidden', true);
        document.getElementById('resume-level').setAttribute('hidden', true);
    }
    CONTROL_ENABLED = false;
    let overlay = document.getElementById('overlay');
    overlay.removeAttribute('hidden');
}

function hideOverlay() {
    CONTROL_ENABLED = true;
    let overlay = document.getElementById('overlay');
    overlay.setAttribute('hidden', true);
}

function openCreateMode() {
    resizeCreateTable(c_width, c_height);
    enableStage('create');
    hideControls();
}

function plotTable(element, table, victory_fuction, selected_box=null, clearPreviousPlot=true) {
    TableManager.SELECTED_BOX = selected_box;
    if(clearPreviousPlot) TableManager.clearPlot();

    let table_container = document.createElement('TABLE');
    table_container.classList.add('table-container');
    element.appendChild(table_container);

    table.container = table_container;
    TableManager.setTarget(table);
    TableManager.victory_fuction = victory_fuction;
    TableManager.plotTable();
}

if(localStorage.getItem('already-start') === null) {
    let ttr_element = document.getElementById('tutorial-container');
    plotTable(ttr_element, TUTORIAL_LEVEL_LIST[0], () => {
        plotTable(ttr_element, TUTORIAL_LEVEL_LIST[1], () => {
            skipTutorial();
        });
    }, '3');
    enableStage('tutorial');
}
else openMenu();

if(localStorage.getItem('last-level') !== null) {
    LAST_LEVEL = Number(localStorage.getItem('last-level'));
}

for(let level in LEVEL_LIST) {
    let level_block = document.createElement('BUTTON');
    level_block.innerHTML = formatLevelString(Number(level)+1);

    level_block.onclick = () => {
        SELECTED_LEVEL = Number(level);
        openGameStage();
    };
    if(Number(level) > LAST_LEVEL) {
        level_block.setAttribute('disabled', true);
    }
    level_container.appendChild(level_block);
}