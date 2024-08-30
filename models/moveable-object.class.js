class MoveableObject extends DrawableObejct {

    otherDirection = false;
    energy = 100;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    /**
    * Moves the object to the left by decreasing its `x` coordinate at a regular interval.
    * The movement speed is controlled by the `speed` property.
    */
    moveLeft() {
        this.moveInterval = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }


    /**
    * Updates the current image to display the next frame in the animation sequence.
    * The `images` parameter is an array of image paths to be used for animation.
    * 
    * @param {string[]} images - An array of image paths for animation.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
    * Applies gravity to the object, causing it to fall unless it's above ground or already falling.
    * The object's vertical speed is adjusted by `speedY`, and gravity is applied by decrementing `speedY`.
    */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }


    /**
    * Determines if the object is above the ground based on its `y` coordinate.
    * Special handling is provided for objects of type `ThrowableObject`.
    * 
    * @returns {boolean} True if the object is above the ground, false otherwise.
    */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 200;
        }
    }


    /**
    * Checks if this object is colliding with another object based on their bounding boxes.
    * 
    * @param {MoveableObject} mo - The object to check for collision with.
    * @returns {boolean} True if the objects are colliding, false otherwise.
    */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
    * Reduces the object's energy by 5 units. If the energy falls below 0, it is set to 0.
    * Updates the `lastHit` timestamp to the current time.
    */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
    * Determines if the object is dead based on its energy level.
    * 
    * @returns {boolean} True if the object's energy is 0, false otherwise.
    */
    isDead() {
        return this.energy == 0;
    }


    /**
    * Determines if the object is currently hurt based on the time since the last hit.
    * 
    * @returns {boolean} True if the object was hit within the last 0.5 seconds, false otherwise.
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }
}