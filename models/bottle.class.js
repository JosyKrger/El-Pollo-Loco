class Bottle extends MoveableObject {

    height = 55;
    width = 60;
    currentImage = 0;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x) {
        super().loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x
        this.y = 370;
        this.animate();
    }


    animate() {
        setInterval( () => {
            let i = this.currentImage % this.IMAGES_BOTTLE.length;
            let path = this.IMAGES_BOTTLE[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 800);
    }
}