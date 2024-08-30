let canvas;
let world;
let keyboard = new Keyboard();
let background_music = new Audio('audio/backgroundmusic.mp3');
let won_sound = new Audio('audio/win.mp3');
let lost_sound = new Audio('audio/lost.mp3');


/**
 * Starts the game by hiding the start screen and showing the game container.
 * Initializes the game world and starts playing the background music in a loop.
 */
function startGame() {
    document.getElementById('startScreen').classList.add('d_none');
    document.getElementById('game-container').classList.remove('d_none');
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    background_music.loop = true;
    background_music.play();
}


/**
 * Handles the actions to be performed when the game is won.
 * Pauses the background music, shows the win screen, hides the mobile and game buttons, and plays the win sound.
 */
function gameWon() {
    background_music.pause();
    document.getElementById('dialog-endscreen-won').classList.remove('d_none');
    document.getElementById('mobile-buttons').classList.add('d_none');
    document.getElementById('game-buttons').style.display = 'none';
    won_sound.play();
}


/**
 * Handles the actions to be performed when the game is lost.
 * Pauses the background music, shows the lose screen, hides the mobile and game buttons, and plays the lose sound.
 */
function gameLost() {
    background_music.pause();
    document.getElementById('dialog-endscreen-lost').classList.remove('d_none');
    document.getElementById('game-buttons').classList.add('d_none');
    document.getElementById('mobile-buttons').classList.add('d_none');
    lost_sound.play();
}


/**
 * Restarts the game by hiding the end screens and calling the startGame function.
 */
function restartGame() {
    console.log("Spiel neustarten");
    document.getElementById('dialog-endscreen-won').classList.add('d_none');
    document.getElementById('dialog-endscreen-lost').classList.add('d_none');
    startGame();
}


/**
 * Returns the user to the start screen by hiding all other screens and showing the start screen.
 */
function backToStartscreen() {
    document.getElementById('dialog-control').classList.add('d_none');
    document.getElementById('dialog-endscreen-won').classList.add('d_none');
    document.getElementById('game-container').classList.add('d_none');
    document.getElementById('dialog-endscreen-lost').classList.add('d_none');
    document.getElementById('mobile-buttons').classList.add('d_none');
    document.getElementById('startScreen').classList.remove('d_none');
    document.getElementById('dialog-impressum').classList.add('d_none');
}


/**
 * Displays the control dialog.
 */
function showControl() {
    document.getElementById('dialog-control').classList.remove('d_none');
}


/**
 * Displays the settings dialog.
 */
function showSettingOptions() {
    document.getElementById('dialog-settings').classList.remove('d_none');
}


/**
 * Displays the impressum dialog.
 */
function showImpressum() {
    document.getElementById('dialog-impressum').classList.remove('d_none');
}


/**
 * Turns off the background music by pausing it.
 */
function turnMusicOff() {
    background_music.pause();
}


/**
 * Turns on the background music by playing it.
 */
function turnMusicOn() {
    background_music.play();
}


/**
 * Turns on all game sounds.
 */
function turnSoundOff() {
    world.character.play_sounds = false;
    world.play_sounds = false;
}


/**
 * Changes the music icon to the "off" state and adjusts the button margins.
 */
function turnSoundOn() {
    world.character.play_sounds = true;
    world.play_sounds = true;
}


/**
 * Changes the music icon to the "on" state and resets the button margins.
 */
function changeMusicIconOff() {
    document.getElementById('sound-button').classList.add('margin_top');
    document.getElementById('restart_button').classList.add('margin_top');
    document.getElementById('music_on_off').innerHTML = `
        <div id ="music_off_button" class="music_off_button" >
        <img onclick="turnMusicOn(); changeMusicIconOn()" src="./img/keyboard/no-music-icon.png" alt="" style="width: 33.5px;">
        </div >
    `;
}


/**
 * Changes the sound icon to the "off" state.
 */
function changeMusicIconOn() {
    document.getElementById('sound-button').classList.remove('margin_top');
    document.getElementById('restart_button').classList.remove('margin_top');
    document.getElementById('music_on_off').innerHTML = `
        <div id ="music-button" class="music_button" >
        <img onclick="turnMusicOff(); changeMusicIconOff()" src="./img/keyboard/music-icon.png" alt="" style="width: 40px;" >
        </div >
    `;
}


/**
 * Changes the sound icon to the "off" state.
 */
function changeSoundIconOff() {
    document.getElementById('sound-button').classList.remove('margin_top');
    document.getElementById('sound_on_off').innerHTML = `
        <div id="sound-button" class="sound_button">
        <img onclick="turnSoundOn(); changeSoundIconOn()" src="./img/keyboard/no-sound-icon.png" alt="" style="width: 28px;">
        </div>
    `;
}


/**
 * Changes the sound icon to the "on" state.
 */
function changeSoundIconOn() {
    document.getElementById('sound-button').classList.remove('margin_top');
    document.getElementById('sound_on_off').innerHTML = `
        <div id="sound-button" class="sound_button">
        <img onclick="turnSoundOff(); changeSoundIconOff()" src="./img/keyboard/sound-icon.png" alt="" style="width: 28px;">
        </div>
    `;
}


/**
 * Sets the character's movement to the left based on the input.
 * @param {boolean} isPressed - Whether the left arrow key is pressed.
 * @returns {boolean} - The updated state of the left arrow key.
 */
function runToLeftMobile(isPressed) {
    return keyboard.LEFT = isPressed;
}


/**
 * Sets the character's movement to the right based on the input.
 * @param {boolean} isPressed - Whether the right arrow key is pressed.
 * @returns {boolean} - The updated state of the right arrow key.
 */
function runToRightMobile(isPressed) {
    return keyboard.RIGHT = isPressed;
}


/**
 * Triggers the bottle throw action based on the input.
 * @param {boolean} isPressed - Whether the throw key is pressed.
 * @returns {boolean} - The updated state of the throw key.
 */
function throwBottleMobile(isPressed) {
    return keyboard.D = isPressed;
}


/**
 * Triggers the jump action based on the input.
 * @param {boolean} isPressed - Whether the jump key is pressed.
 * @returns {boolean} - The updated state of the jump key.
 */
function jumpMobile(isPressed) {
    return keyboard.SPACE = isPressed;
}


/**
 * Listens for keydown events and updates the corresponding key states in the keyboard object.
 */

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 70) {
        keyboard.F = true;
    }
});


/**
 * Listens for keyup events and updates the corresponding key states in the keyboard object.
 */
window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 70) {
        keyboard.F = false;
    }
});