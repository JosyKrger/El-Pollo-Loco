class BackgroundObject extends MoveableObject {

    width = 721;
    height = 480;


    /**
     * Creates an instance of BackgroundObject.
     * 
     * @constructor
     * @param {string} imagePath - The path to the image used for the background.
     * @param {number} x - The x-coordinate position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath, x);
        this.x = x;
        this.y = 480 - this.height;
    }
}