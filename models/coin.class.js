class Coin extends MoveableObject {

    height = 100;
    width = 100;
    IMAGES_BOUNCING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    currentImage = 0;
    offset = {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
    };


    /**
     * Creates an instance of Coins.
     * Initializes the object with bouncing animations and sets its position.
     * 
     * @param {number} x - The x-coordinate of the bouncing object.
     * @param {number} y - The y-coordinate of the bouncing object.
     */
    constructor(x, y) {
        super().loadImage(this.IMAGES_BOUNCING[0]);
        this.loadImages(this.IMAGES_BOUNCING);
        this.x = x;
        this.y = y;
        this.animate();
    }


    /**
     * Starts the bouncing animation by cycling through the images at a specified interval.
     * Updates the displayed image based on the current animation frame.
     */
    animate() {
        setInterval( () => {
            let i = this.currentImage % this.IMAGES_BOUNCING.length;
            let path = this.IMAGES_BOUNCING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1200);
    }
}