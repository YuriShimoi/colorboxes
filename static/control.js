CONTROL_ENABLED = true;

function controlElement() {
    if(!CONTROL_ENABLED) return;

    let keyboard = document.createElement('DIV');
    keyboard.classList.add('control-keyboard');

    let up_btn = document.createElement('BUTTON');
    up_btn.classList.add('control-key');
    up_btn.style.fontSize = '1.2em';
    up_btn.innerHTML = '▲';
    up_btn.onclick = () => TableManager.runMove('up');
    keyboard.appendChild(up_btn);
    let left_btn = document.createElement('BUTTON');
    left_btn.classList.add('control-key');
    left_btn.innerHTML = '◀';
    left_btn.onclick = () => TableManager.runMove('left');
    keyboard.appendChild(left_btn);
    let down_btn = document.createElement('BUTTON');
    down_btn.classList.add('control-key');
    down_btn.style.fontSize = '1.2em';
    down_btn.innerHTML = '▼';
    down_btn.onclick = () => TableManager.runMove('down');
    keyboard.appendChild(down_btn);
    let right_btn = document.createElement('BUTTON');
    right_btn.classList.add('control-key');
    right_btn.innerHTML = '▶';
    right_btn.onclick = () => TableManager.runMove('right');
    keyboard.appendChild(right_btn);
    
    return keyboard;
}

document.getElementById('controls').appendChild(controlElement());
window.addEventListener("keydown", function (event) {
    if(!CONTROL_ENABLED) return;
    
    switch (event.key) {
        case "ArrowDown":
        case "s":
        case "S":
            TableManager.runMove('down');
            break;
        case "ArrowUp":
        case "w":
        case "W":
            TableManager.runMove('up');
            break;
        case "ArrowLeft":
        case "a":
        case "A":
            TableManager.runMove('left');
            break;
        case "ArrowRight":
        case "d":
        case "D":
            TableManager.runMove('right');
            break;
        default:
            return;
    }
}, true);