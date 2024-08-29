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
    idleTime = 0;
    currentImage = 0;
    timeUntilSleepAnimation = false;
    world;
    isInvincible = false;
    walking_sound = new Audio('audio/running.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    play_sounds = true;
    offset = {
        top: 100,
        left: 20,
        right: 20,
        bottom: 0
    };


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


    stopCharacterSound() {
        this.walking_sound.pause();
        this.jumping_sound.pause();
    }


    animate() {
        // Bewegung des Charakters
        setInterval(() => {
            this.walkToRight();
            this.walkToLeft();
            this.jump();
            this.world.camera_x = -this.x + 115;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead() || this.isHurt() || this.isAboveGround()) {
                return;
            }
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.timeUntilSleepAnimation = false;
                console.log("timeUntilSleepAnimation", this.timeUntilSleepAnimation);
            }
        }, 100);

        setInterval(() => {
            if (this.isDead() || this.isHurt()) {
                return; 
            }
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.timeUntilSleepAnimation = false;
                console.log("timeUntilSleepAnimation", this.timeUntilSleepAnimation);
            }
        }, 100);

        setInterval(() => {
            if (this.isDead()) {
                return;
            }
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 150);

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
        setInterval(() => {
            if (this.isDoingNothing() && !this.timeUntilSleepAnimation) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 230);
    }


    sleepTimer() {
        this.timeUntilSleepAnimation = false;
        setTimeout(() => {
            this.timeUntilSleepAnimation = true;
        }, 10000);
        this.playAnimation(this.IMAGES_SLEEPING);
    }
  

    isDoingNothing() {
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE && !this.world.keyboard.F) {
            return true;
        } else {
            return false;
        }
    }


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


    jump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.speedY = 30;
            if (this.play_sounds) {
                this.jumping_sound.pause();
                this.jumping_sound.play();
            }
        }
    }


    activateInvincibility() {
        this.isInvincible = true;
        setTimeout(() => {
            this.isInvincible = false;
        }, 1000);
    }


    jumpAndActivateInvincibility() {
        this.jump();
        this.activateInvincibility();
    }
} 