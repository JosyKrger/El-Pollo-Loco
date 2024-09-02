class Endboss extends MoveableObject {

    x = 5000;
    y = 50;
    height = 400;
    width = 400;
    speed = 5;
    energy = 100;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    hurtToggle = true;
    currentImage = 0;
    world;
    characterReachesBorder = false;
    isHurt = false;
    isDead = false;
    walkingAnimationInterval = null;
    walkingLeftAndRightInterval = null;
    alertAnimationInterval;
    offset = {
        top: 60,
        left: 50,
        right: 20,
        bottom: 0
    };


    /**
    * Creates an instance of the Endboss class.
    * Initializes the endboss with default settings and loads its images.
    * 
    * @param {World} world - The game world that the endboss belongs to.
    */
    constructor(world) {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.world = world;
        this.animate();
    }


    /**
    * Handles the endboss's animations based on its current state.
    * - When the endboss's energy is zero or less, it triggers the death animation and ends the game.
    * - When the endboss is hurt, it plays the hurt animation and reduces speed.
    * - When the character reaches the endboss's border, it triggers the attack animation.
    * - Otherwise, it handles the waiting animation and movement.
    */
    animate() {
        setInterval(() => {
            if (this.energy <= 0) {
                this.endbossIsDead();
                gameWon();
            } else if (this.isHurt) {
                this.increaseEndbossSpeed();
                this.hurtAnimation();
                //this.attackAnimation();
            } else if (this.characterReachesBorder) {
                this.attackAnimation();
            } else {
                this.waitingForCharacter();
            }
        }, 300);
    }


    /**
    * Handles the endboss's death sequence.
    * Plays the death animation and triggers the game win event.
    */
    endbossIsDead() {
        let i = 0
        if (i < 3) {
            this.deathAnimation();
        }
        i++;
    }


    /**
    * Handles the endboss's behavior when waiting for the character.
    * Moves the endboss left and right while playing the walking animation.
    */
    waitingForCharacter() {
        this.walkToLeft();
        this.walkToRight();
        this.playAnimation(this.IMAGES_WALKING);
        this.x += this.speed;
    }


    /**
    * Triggers the attack animation when the character reaches the endboss's border.
    */
    attackAnimation() {
        let i = 0
        if (i < 16) {
            this.playAnimation(this.IMAGES_ATTACK);
        }
        i++;
        setTimeout(() => {
        this.otherDirection = false;
        this.walkToLeft();
        this.x += this.speed;
        this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }


    /**
    * Makes the endboss follow the character based on its position.
    * Adjusts the endboss's position and direction based on the character's position.
    */
    followCharacter() {
        this.playAnimation(this.IMAGES_WALKING);
        if (this.world.character.x < this.x) {
            this.x -= this.speed;
            this.otherDirection = false;
        } else if (this.world.character.x > this.x) {
            this.x += this.speed;
            this.otherDirection = true;
        }
    }


    /**
    * Plays the hurt animation for the endboss.
    */
    hurtAnimation() {
        let i = 0
        if (i < 3) {
            this.playAnimation(this.IMAGES_HURT);
        }
        i++;
    }


    /**
    * Increase the speed of the endboss.
    */
    increaseEndbossSpeed() {
        this.playAnimation(this.IMAGES_WALKING);
        this.speed = this.speed - 70;
        setTimeout(() => {
            this.speed = 5;
        }, 2600);
    }


    /**
    * Plays the death animation for the endboss and clears all intervals after a delay.
    */
    deathAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.world.clearAllIntervals();
        }, 450);
    }


    /**
    * Determines if the character is within a certain position relative to the endboss.
    * 
    * @returns {boolean} Always returns true.
    */
    characterPosition() {
        return true;
    }


    /**
    * Moves the endboss to the right if within bounds.
    */
    walkToRight() {
        if (this.x <= 4800) {
            this.speed = 5;
            this.otherDirection = true;
        }
    }


    /**
    * Moves the endboss to the left if within bounds.
    */
    walkToLeft() {
        if (this.x >= 5000) {
            this.speed = -5;
            this.otherDirection = false;
        }
    }
}