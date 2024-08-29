class World {
    character = new Character();
    healthStatusbar = new HealthStatusbar();
    coinsStatusbar = new CoinStatusbar();
    bottlesStatusbar = new BottleStatusbar();
    endbossStatusbar = new EndbossStatusbar();
    throwBottle = new ThrowableObject();
    throwableObjects = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    coolDown = 0;
    collect_bottle_sound = new Audio('audio/bottle.mp3');
    throw_bottle_sound = new Audio('audio/throw.mp3');
    defeat_chicken_sound = new Audio('audio/chicken.mp3');
    broke_bottle_sound = new Audio('audio/glass.mp3');
    collect_coins_sound = new Audio('audio/collectcoins.mp3');
    get_damage_sound = new Audio('audio/getdamage.mp3');
    hit_endboss_sound = new Audio('audio/endboss.mp3');
    play_sounds = true;


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
        this.level.endboss.forEach(boss => {
            boss.world = this;
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.healthStatusbar);
        this.addToMap(this.coinsStatusbar);
        this.addToMap(this.bottlesStatusbar);
        this.addToMap(this.endbossStatusbar);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
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
        this.level.endboss.forEach((boss) => {
            if (this.character.x >= 4200) {
                boss.characterReachesBorder = true;
            }

        });

        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bottle, index) => {
                if (bottle.isColliding(enemy)) {
                    this.throwableObjects.splice(index, 1);
                    enemy.die();
                    if (this.play_sounds) {
                        this.broke_bottle_sound.pause();
                        this.broke_bottle_sound.play();
                    }
                    return false;
                }
            })
        });

        this.level.endboss.forEach((boss) => {
            this.throwableObjects.forEach((bottle, index) => {
                if (bottle.isColliding(boss)) {
                    boss.energy -= 20;
                    this.throwableObjects.splice(index, 1);
                    boss.isHurt = true;
                    if (this.play_sounds) {
                        this.hit_endboss_sound.pause();
                        this.hit_endboss_sound.play();
                    }
                    setTimeout(() => {
                        boss.isHurt = false;
                    }, 400);
                    this.updateStatusBar();
                    if (this.play_sounds) {
                        this.broke_bottle_sound.pause();
                        this.broke_bottle_sound.play();
                    }
                }
            })
        });

        this.level.endboss.forEach((boss) => {
            if (this.character.isColliding(boss)) {
                this.character.hit();
                this.healthStatusbar.setHealthPercentage(this.character.energy);
                if (this.play_sounds) {
                    this.get_damage_sound.pause();
                    this.get_damage_sound.play();
                }
            }

        });

        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                enemy.die();
                if (this.play_sounds) {
                    this.defeat_chicken_sound.pause();
                    this.defeat_chicken_sound.play();
                }
                this.character.jumpAndActivateInvincibility();
                return false;
            } else if (this.character.isColliding(enemy)) {
                if (!this.character.isInvincible) {
                    this.character.hit();
                    if (this.play_sounds) {
                        this.get_damage_sound.pause();
                        this.get_damage_sound.play();
                    }
                    this.healthStatusbar.setHealthPercentage(this.character.energy);
                }
            }
            return true;
        });

        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinsStatusbar.setCoinPercentage(this.coinsStatusbar.coin_percentage + 10);
                if (this.play_sounds) {
                    this.collect_coins_sound.pause();
                    this.collect_coins_sound.play();
                }
                return false;
            }
            return true;
        });

        this.level.bottles = this.level.bottles.filter((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottlesStatusbar.setBottlePercentage(this.bottlesStatusbar.bottle_percentage + 10);
                if (this.play_sounds) {
                    this.collect_bottle_sound.pause();
                    this.collect_bottle_sound.play();
                }
                return false;
            }
            return true;
        });
    }


    updateStatusBar() {
        this.endbossStatusbar.setEndbossPercentage(this.endbossStatusbar.endboss_percentage - 20);
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 50);
        setInterval(() => {
            this.checkThrowObjects();
            this.coolDownBottle();
        }, 300);
    }


    checkThrowObjects() {
        // if (this.bottles.bottle_percentage > 0) {
        if (this.keyboard.F && this.coolDown <= 0) {
            this.coolDown = 40;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.throw_bottle_sound.pause();
            this.throw_bottle_sound.play();
            this.reduceBottleStatusBar();
        }
        // }
    }


    coolDownBottle() {
        if (this.coolDown > 0) {
            this.coolDown -= 1000/60;
        }
    }


    reduceBottleStatusBar() {
        this.bottlesStatusbar.setBottlePercentage(this.bottlesStatusbar.bottle_percentage - 10);
    }


    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}