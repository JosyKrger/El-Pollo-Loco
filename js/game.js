let canvas;
let world;
let keyboard = new Keyboard();
let background_music = new Audio('audio/backgroundmusic.mp3');
let won_sound = new Audio('audio/win.mp3');
let lost_sound = new Audio('audio/lost.mp3');

function startGame() {
    closeStartScreen = document.getElementById('startScreen').classList.add('d_none');
    document.getElementById('game-container').classList.remove('d_none');
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    background_music.loop = true;
    background_music.play();
}


function gameWon() {
    background_music.pause();
    document.getElementById('dialog-endscreen-won').classList.remove('d_none');
    document.getElementById('mobile-buttons').style.position = 'fixed';
    document.getElementById('mobile-buttons').classList.add('d_none');
    document.getElementById('game-buttons').style.display = 'none';
    won_sound.play();
}


function gameLost() {
    background_music.pause();
    document.getElementById('dialog-endscreen-lost').classList.remove('d_none');
    document.getElementById('game-buttons').classList.add('d_none');
    document.getElementById('mobile-buttons').classList.add('d_none');
    lost_sound.play();
}


function restartGame() {
    console.log("Spiel neustarten");
    document.getElementById('dialog-endscreen-won').classList.add('d_none');
    document.getElementById('dialog-endscreen-lost').classList.add('d_none');
    startGame();
}


function backToStartscreen() {
    document.getElementById('dialog-control').classList.add('d_none');
    document.getElementById('dialog-endscreen-won').classList.add('d_none');
    document.getElementById('game-container').classList.add('d_none');
    document.getElementById('dialog-endscreen-lost').classList.add('d_none');
    document.getElementById('mobile-buttons').classList.add('d_none');
    document.getElementById('startScreen').classList.remove('d_none');
}


function showControl() {
    document.getElementById('dialog-control').classList.remove('d_none');
}


function showSettingOptions() {
    console.log("Setting Optionen");
    document.getElementById('dialog-settings').classList.remove('d_none');
}


function turnMusicOff() {
    background_music.pause();
}


function turnMusicOn() {
    background_music.play();
}


function turnSoundOff() {
    world.character.play_sounds = false;
    world.play_sounds = false;
}


function turnSoundOn() {
    world.character.play_sounds = true;
    world.play_sounds = true;
}


function changeMusicIconOff() {
    document.getElementById('sound-button').classList.add('margin_top');
    document.getElementById('restart_button').classList.add('margin_top');
    document.getElementById('music_on_off').innerHTML = `
        <div id ="music_off_button" class="music_off_button" >
        <img onclick="turnMusicOn(); changeMusicIconOn()" src="./img/keyboard/no-music-icon.png" alt="" style="width: 33.5px;">
        </div >
    `;
}


function changeMusicIconOn() {
    document.getElementById('sound-button').classList.remove('margin_top');
    document.getElementById('restart_button').classList.remove('margin_top');
    document.getElementById('music_on_off').innerHTML = `
        <div id ="music-button" class="music_button" >
        <img onclick="turnMusicOff(); changeMusicIconOff()" src="./img/keyboard/music-icon.png" alt="" style="width: 40px;" >
        </div >
    `;
}


function changeSoundIconOff() {
    document.getElementById('sound-button').classList.remove('margin_top');
    document.getElementById('sound_on_off').innerHTML = `
        <div id="sound-button" class="sound_button">
        <img onclick="turnSoundOn(); changeSoundIconOn()" src="./img/keyboard/no-sound-icon.png" alt="" style="width: 28px;">
        </div>
    `;
}


function changeSoundIconOn() {
    document.getElementById('sound-button').classList.remove('margin_top');
    document.getElementById('sound_on_off').innerHTML = `
        <div id="sound-button" class="sound_button">
        <img onclick="turnSoundOff(); changeSoundIconOff()" src="./img/keyboard/sound-icon.png" alt="" style="width: 28px;">
        </div>
    `;
}


function runToLeftMobile(isPressed) {
    return keyboard.LEFT = isPressed;
}


function runToRightMobile(isPressed) {
    return keyboard.RIGHT = isPressed;
}


function throwBottleMobile(isPressed) {
    return keyboard.D = isPressed;
}


function jumpMobile(isPressed) {
    return keyboard.SPACE = isPressed;
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