class Chick extends MoveableObject {

    y = 390;
    height = 30;
    width = 30;
    speed = 0.2 + Math.random() * 1;
    isDead = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEATH = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    currentImage = 0;
    offset = {
        top: -5,
        left: 15,
        right: 15,
        bottom: 0
    };


    /**
     * Creates an instance of SmallChicken.
     * Initializes the chicken with a random position and starts its walking animation.
     * 
     * @constructor
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 300 + Math.random() * 5500;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    /**
     * Starts the walking animation of the chicken.
     * The chicken moves to the left and plays the walking animation.
     */
    animate() {
        if (!this.isDead) { 
            this.moveLeft();
            this.animationInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
            }, 150);
        }

    }


    /**
     * Triggers the death of the chicken.
     * Stops all animations, plays the death image, and removes the chicken from the game after a short delay.
     */
    die() {
        this.isDead = true;
        clearInterval(this.animationInterval);
        clearInterval(this.moveInterval); 
        this.loadImage(this.IMAGE_DEATH[0]); 
        setTimeout(() => {
            this.remove(); 
        }, 1000);
    }


    /**
     * Removes the chicken from the game's enemy list.
     */
    remove() {
        world.level.enemies = world.level.enemies.filter(enemy => enemy !== this);
    }
}