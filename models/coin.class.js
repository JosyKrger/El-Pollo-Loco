class Coin extends MoveableObject {

    height = 100;
    width = 100;
    IMAGES_BOUNCING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    currentImage = 0;
    offset = {
        top: 15,
        left: 15,
        right: 15,
        bottom: 15
    };

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 300 + Math.random() * 3000;
        this.y = 100 + Math.random() * 150;
        this.loadImages(this.IMAGES_BOUNCING);
        this.animate();
    }


    animate() {
        setInterval( () => {
            let i = this.currentImage % this.IMAGES_BOUNCING.length;
            let path = this.IMAGES_BOUNCING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1200);
    }
}