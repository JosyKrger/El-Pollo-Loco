class DrawableObejct {

    x = 120;
    y = 120;
    height = 150;
    width = 100;
    
    img;
    imageCache = {};
    currentImage = 0;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(loadImages) {
        loadImages.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        this.drawFrameChickens(ctx);
        this.drawFrameCharacter(ctx);
        this.drawFrameBottles(ctx);
        this.drawFrameEndboss(ctx);
        this.drawFrameCoins(ctx);
    }


    drawFrameChickens(ctx) {
        if (this instanceof Chicken || this instanceof Chick) {
            let shrinkAmount = 5;
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.x + shrinkAmount,
                this.y + shrinkAmount,
                this.width - 2 * shrinkAmount,
                this.height - 2 * shrinkAmount
            );
            ctx.stroke();
        }
    }


    drawFrameCharacter(ctx) {
        if (this instanceof Character) {
            let shrinkX = 20;
            let shrinkY = 90;
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.x + shrinkX,
                this.y + shrinkY,
                this.width - 2.5 * shrinkX,
                this.height - 1.1 * shrinkY
            );
            ctx.stroke();
        }
    }



    drawFrameBottles(ctx) {
        if (this instanceof Bottle) {
            let shrinkX = 23;
            let shrinkY = 10;
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.x + shrinkX,
                this.y + shrinkY,
                this.width - 2 * shrinkX,
                this.height - 1.5 * shrinkY
            );
            ctx.stroke();
        }
    }


    drawFrameEndboss(ctx) {
        if (this instanceof Endboss) {
            let shrinkX = 20;
            let shrinkY = 75;
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.x + shrinkX,
                this.y + shrinkY,
                this.width - 2 * shrinkX,
                this.height - 1.3 * shrinkY
            );
            ctx.stroke();
        }
    }


    drawFrameCoins(ctx) {
        if (this instanceof Coin) {
            let shrinkX = 35;
            let shrinkY = 35;
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.x + shrinkX,
                this.y + shrinkY,
                this.width - 2 * shrinkX,
                this.height - 2 * shrinkY
            );
            ctx.stroke();
        }
    }
}