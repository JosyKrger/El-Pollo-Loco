class Chicken extends MoveableObject {

    y = 360;
    height = 60;
    width = 60;
    speed = 0.5 + Math.random() * 1;
    isDead = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEATH = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    currentImage = 0;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 370 + Math.random() * 5500;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    animate() {
        if (!this.isDead) { 
            this.moveLeft();
            this.animationInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
            }, 150);
            setInterval(() => {
                this.jump();
            }, 1000 + Math.random() * 1000);
        }
    }

    
    jump() {
        if (this.y == 360) {
            this.speedY = this.y + 20 + Math.random() * 10; // Hüpfen mit einer zufälligen Geschwindigkeit
        }
    }


    die() {
        this.isDead = true;
        clearInterval(this.animationInterval); 
        clearInterval(this.moveInterval); 
        this.loadImage(this.IMAGE_DEATH[0]); 
        setTimeout(() => {
            this.remove();
        }, 1000); 
    }


    remove() {
        world.level.enemies = world.level.enemies.filter(enemy => enemy !== this);
    }
}