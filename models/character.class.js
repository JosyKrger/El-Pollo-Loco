class Character extends MoveableObject {

    x = 130;
    y = 200;
    height = 230;
    width = 130;
    speed = 7;
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    currentImage = 0;
    timeUntilSleepAnimation = false;
    characterIsSleepingTimeout;
    characterIsSleepingInterval;
    characterIsWaitingInterval;
    world;
    isInvincible = false;
    walking_sound = new Audio('audio/running.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    play_sounds = true;
    offset = {
        top: 100,
        left: 33,
        right: 33,
        bottom: 0
    };


    /**
     * Creates an instance of Character.
     * Initializes the character with images and animations, applies gravity, and starts the animations.
     * 
     * @constructor
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.world = null;
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }


    /**
     * Stops all character sounds, including walking and jumping sounds.
     */
    stopCharacterSound() {
        this.walking_sound.pause();
        this.jumping_sound.pause();
    }


    /**
     * Starts the main animation loop for the character.
     * The loop handles character movement, jumping, hurt, death, and idle animations.
     */
    animate() {
        this.cameraIsMoving();
        this.characterIsRunning();
        this.characterIsJumping();
        this.characterIsHurt();
        this.characterIsDead();
        this.characterIsWaiting();
    }


    /**
     * Handles the camera movement based on the character's position.
     * Updates the camera position as the character moves.
     * Runs at 60 frames per second.
     */
    cameraIsMoving() {
        setInterval(() => {
            this.walkToRight();
            this.walkToLeft();
            this.jump();
            this.world.camera_x = -this.x + 115;
        }, 1000 / 60);
    }


    /**
     * Handles the running animation of the character.
     * The character plays the walking animation when moving left or right, unless it is dead, hurt, or in the air.
     * Runs at 10 frames per second.
     */
    characterIsRunning() {
        setInterval(() => {
            if (this.isDead() || this.isHurt() || this.isAboveGround()) {
                return;
            }
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }


    /**
     * Handles the jumping animation of the character.
     * The character plays the jumping animation when it is in the air, unless it is dead or hurt.
     * Runs at 10 frames per second.
     */
    characterIsJumping() {
        let i = 0
        setInterval(() => {
            if (this.isDead() || this.isHurt()) {
                return;
            }
            if (this.isAboveGround()) {
                if (i < 9) {
                    this.playAnimation(this.IMAGES_JUMPING);
                    i++;
                } else {
                    i = 0;
                }
            }
        }, 250);
    }


    /**
     * Handles the hurt animation of the character.
     * The character plays the hurt animation when it is hurt, unless it is dead.
     * Runs at approximately 6.67 frames per second.
     */
    characterIsHurt() {
        setInterval(() => {
            if (this.isDead()) {
                return;
            }
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 150);
    }


    /**
     * Handles the death animation of the character.
     * The character plays the death animation when it is dead and then triggers the game over sequence.
     * Runs at 12.5 frames per second.
     */
    characterIsDead() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    this.world.clearAllIntervals();
                }, 450);
                gameLost();
                this.walking_sound.pause();
                this.jumping_sound.pause();
            }
        }, 80);
    }


    /**
     * Handles the idle animation of the character.
     * The character plays the idle animation when it is doing nothing.
     * Runs at approximately 4.35 frames per second.
     */
    characterIsWaiting() {
        clearTimeout(this.characterIsSleepingTimeout);
        clearInterval(this.characterIsWaitingInterval);
        clearInterval(this.characterIsSleepingInterval);

        this.characterIsWaitingInterval = setInterval(() => {
            if (this.isDoingNothing() && !this.timeUntilSleepAnimation) {
                this.playAnimation(this.IMAGES_IDLE);
                this.startSleepTimer();
            }
        }, 230);
    }


    /**
    * Starts the timeout to trigger the sleep animation after a period of inactivity.
    */
    startSleepTimer() {
        if (!this.characterIsSleepingTimeout) {
            this.characterIsSleepingTimeout = setTimeout(() => {
                this.timeUntilSleepAnimation = true;
                this.characterIsSleeping();
            }, 5000);
        }
    }


    /**
    * Handles the sleeping animation of the character.
    * The character plays the sleeping animation when it is idle and has not moved for a certain period.
    */
    characterIsSleeping() {
        if (this.timeUntilSleepAnimation) {
            this.characterIsSleepingInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_SLEEPING);
            }, 240);
        }
    }


    /**
    * Checks if the character is not performing any actions.
    * 
    * @returns {boolean} Returns true if the character is not moving or performing any actions, otherwise false.
    */
    isDoingNothing() {
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE && !this.world.keyboard.F) {
            return true;
        } else {
            this.resetWaitingState();
            return false;
        }
    }


    /**
     * Resets the waiting state and cancels any sleep animation.
     */
    resetWaitingState() {
        this.timeUntilSleepAnimation = false;
        clearTimeout(this.characterIsSleepingTimeout);
        this.characterIsSleepingTimeout = null;
        clearInterval(this.characterIsWaitingInterval);
        this.characterIsWaiting();
    }


    /**
     * Moves the character to the right if the right arrow key is pressed.
     * Updates the character's position and plays the walking sound if the character is on the ground.
     */
    walkToRight() {
        this.walking_sound.pause();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            this.otherDirection = false;
            if (!this.isAboveGround()) {
                if (this.play_sounds) {
                    this.walking_sound.play();
                }
            }
        }
    }


    /**
     * Moves the character to the left if the left arrow key is pressed.
     * Updates the character's position and plays the walking sound if the character is on the ground.
     */
    walkToLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.x -= this.speed;
            this.otherDirection = true;
            if (!this.isAboveGround()) {
                if (this.play_sounds) {
                    this.walking_sound.play();
                }
            }
        }
    }


    /**
     * Makes the character jump if the space bar is pressed and the character is on the ground.
     * Plays the jumping sound when the character jumps.
     */
    jump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.speedY = 30;
            if (this.play_sounds) {
                this.jumping_sound.play();
            }
        }
    }


    /**
    * Activates invincibility for the character, making them immune to damage for a short period.
    * The invincibility lasts for 1 second.
    */
    activateInvincibility() {
        this.isInvincible = true;
        setTimeout(() => {
            this.isInvincible = false;
        }, 1000);
    }


    /**
    * Makes the character jump and simultaneously activates invincibility.
    * This method is typically used after the character defeats an enemy.
    */
    jumpAndActivateInvincibility() {
        this.jump();
        this.activateInvincibility();
    }
} 