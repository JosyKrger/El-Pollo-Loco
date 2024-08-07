class Chicken extends MoveableObject {

    y = 360;
    height = 60;
    width = 60;
    speed = 0.2 + Math.random() * 0.5;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    currentImage = 0;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 370 + Math.random() * 3500;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    animate() {
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }
    
}