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
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
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
    endbossAlertInterval;
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
            } else if (this.characterReachesBorder) {
                this.attackAnimation();
            } else {
                this.endbossAlertAnimation();
            }
        }, 200);
    }


    /**
    * Handles the endboss's death sequence.
    * Plays the death animation and triggers the game win event.
    */
    endbossIsDead() {
            this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.world.clearAllIntervals();
        }, 450);
    }


    /**
    * Triggers the attack animation when the character reaches the endboss's border.
    */
    attackAnimation() {
        this.walkToLeft();
        this.playAnimation(this.IMAGES_ATTACK);
    }

 
    /**
    * Plays the hurt animation for the endboss.
    */
    hurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
    }


    /**
    * Plays the alert animation for the endboss.
    */
    endbossAlertAnimation() {
        this.playAnimation(this.IMAGES_ALERT);
    }


    /**
    * Increase the speed of the endboss.
    */
    increaseEndbossSpeed() {
        this.playAnimation(this.IMAGES_WALKING);
        this.x = this.x - 100;
        setTimeout(() => {
            this.x = this.x - 75;
        }, 7800);
    }


    /**
    * Moves the endboss to the left if within bounds.
    */
    walkToLeft() {
        this.x = this.x - 5;
        this.otherDirection = false;
    }
}