class DrawableObejct {

    x = 120;
    y = 120;
    height = 150;
    width = 100;

    img;
    imageCache = {};
    currentImage = 0;


    /**
    * Loads an image from a specified path and sets it as the current image for this object.
    * 
    * @param {string} path - The path to the image file to be loaded.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
    * Loads multiple images from specified paths and caches them for later use.
    * 
    * @param {string[]} loadImages - An array of image file paths to be loaded.
    */
    loadImages(loadImages) {
        loadImages.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
    * Draws the current image of this object on the specified canvas context.
    * 
    * @param {CanvasRenderingContext2D} ctx - The 2D drawing context of the canvas where the image will be drawn.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}