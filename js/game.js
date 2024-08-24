let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
    closeStartScreen = document.getElementById('startScreen').classList.add('d_none');
    startTheGame = document.getElementById('canvas').style.display = 'flex';
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function gameWon() {
    console.log("Spiel gewonnen");
}


function gameLost() {
    console.log("Spiel verloren");
}


function restartGame() {
    console.log("Spiel neustarten");
}


function backToStartscreen() {
    document.getElementById('dialog-control').classList.add('d_none');
}


function showControl() {
    document.getElementById('dialog-control').classList.remove('d_none');
}


function showSettingOptions() {
    console.log("Setting Optionen");
}


window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});


window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});