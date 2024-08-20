class ThrowableObject extends MoveableObject {


    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    speedY = 30;
    speedX = 20;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 70;
        this.throw();
    }


    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval( () => {
            this.playAnimation(this.IMAGES_ROTATE);
        }, 65);
        setInterval(() => {
            this.x += 10;
        }, 30);
    }
}