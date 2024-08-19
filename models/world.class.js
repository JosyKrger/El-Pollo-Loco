class World {
    health = new HealthStatusbar();
    coins = new CoinStatusbar();
    bottles = new BottleStatusbar();
    endboss = new EndbossStatusbar();
    character = new Character();
    throwBottle = new ThrowableObject();
    throwableObjects = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.health);
        this.addToMap(this.coins);
        this.addToMap(this.bottles);
        this.addToMap(this.endboss);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(obejects) {
        obejects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) { // mo = moveable Object
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingFromAbove(enemy)) {
                enemy.die();
                this.character.jump();
                return false;
            } else if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.health.setHealthPercentage(this.character.energy);
            }

            this.throwableObjects.forEach((bottle) => {
                this.level.enemies.forEach((enemy) => {
                    if (bottle.isColliding(enemy)) {
                        // Überprüfe, ob es sich um den Endboss handelt
                        if (enemy instanceof Endboss) {
                            this.endboss.setEndbossPercentage(this.endboss.endboss_percentage - 20);
                            console.log(this.endboss.endboss_percentage);
                        } else {
                            // Für andere Feinde wie Chicken oder Chick
                            enemy.die(); // Starte die Sterbeanimation und entferne den Feind
                        }
                        // Entferne die Flasche nach der Kollision
                        this.throwableObjects = this.throwableObjects.filter(obj => obj !== bottle);
                    }
                });
            });

            return true;
        });

        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.isColliding(coin)) {
                this.coins.setCoinPercentage(this.coins.coin_percentage + 20);
                return false;
            }
            return true;
        });

        this.level.bottles = this.level.bottles.filter((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottles.setBottlePercentage(this.bottles.bottle_percentage + 20);
                return false;
            }
            return true;
        });
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 100);
    }


    checkThrowObjects() {
        // if (this.bottles.bottle_percentage > 0) {
            if (this.keyboard.D) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.reduceBottleStatusBar();
            }
        // }
    }


    reduceBottleStatusBar() {
        this.bottles.setBottlePercentage(this.bottles.bottle_percentage - 20);
    }
}