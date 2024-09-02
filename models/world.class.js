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
    collisionsIntervall;
    checkThrowedBottleInterval;


    /**
    * Represents the game world, including the canvas, keyboard input, and game objects.
    * 
    * @param {HTMLCanvasElement} canvas - The canvas element where the game is drawn.
    * @param {Object} keyboard - An object to handle keyboard input.
    */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
    * Sets the world context for the character and endboss objects.
    * Links the world to character and endboss instances.
    */
    setWorld() {
        this.character.world = this;
        this.level.endboss.forEach(boss => {
            boss.world = this;
        });
    }


    /**
    * Draws the game objects on the canvas and continuously updates the rendering.
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.staticObjects();
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
    * Draws static UI elements such as health and status bars.
    */
    staticObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthStatusbar);
        this.addToMap(this.coinsStatusbar);
        this.addToMap(this.bottlesStatusbar);
        this.addToMap(this.endbossStatusbar);
        this.ctx.translate(this.camera_x, 0);
    }


    /**
    * Adds a list of objects to the map by drawing them.
    * 
    * @param {Array<Object>} objects - The list of objects to be drawn on the map.
    */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
    * Draws a single object on the map and handles flipping if needed.
    * 
    * @param {Object} mo - The object to be drawn.
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
    * Flips the image horizontally for an object.
    * 
    * @param {Object} mo - The object whose image is to be flipped.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
    * Restores the context to its original state after flipping an image.
    * 
    * @param {Object} mo - The object whose image was flipped.
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
    * Checks for collisions between various game objects and handles them.
    */
    checkCollisions() {
        this.collisionCharacterXCoordinate();
        this.collisionEnemyBottle();
        this.collisionEndbossBottle();
        this.collisionCharacterEndboss();
        this.collisionCharacterEnemy();
        this.collisionCharacterCoins();
        this.collisionCharacterBottle();
    }



    /**
    * Updates endboss behavior when the character reaches a specific x-coordinate.
    */
    collisionCharacterXCoordinate() {
        this.level.endboss.forEach((boss) => {
            if (this.character.x >= 4200) {
                boss.characterReachesBorder = true;
            }
        });
    }


    /**
    * Handles collisions between enemies and thrown bottles.
    */
    collisionEnemyBottle() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bottle, index) => {
                if (bottle.isColliding(enemy)) {
                    this.throwableObjects.splice(index, 1);
                    enemy.die();
                    if (this.play_sounds) {
                        this.broke_bottle_sound.play();
                    }
                    return false;
                }
            })
        });
    }


    /**
    * Handles collisions between endbosses and thrown bottles.
    */
    collisionEndbossBottle() {
        this.level.endboss.forEach((boss) => {
            this.throwableObjects.forEach((bottle, index) => {
                if (bottle.isColliding(boss)) {
                    boss.energy -= 20;
                    this.throwableObjects.splice(index, 1);
                    boss.isHurt = true;
                    if (this.play_sounds) {
                        this.hit_endboss_sound.play();
                    }
                    setTimeout(() => {
                        boss.isHurt = false;
                    }, 400);
                    this.updateStatusBar();
                    if (this.play_sounds) {
                        this.broke_bottle_sound.play();
                    }
                }
            })
        });
    }


    /**
    * Handles collisions between the character and the endboss.
    */
    collisionCharacterEndboss() {
        this.level.endboss.forEach((boss) => {
            if (this.character.isColliding(boss)) {
                this.character.hit();
                this.healthStatusbar.setHealthPercentage(this.character.energy);
                if (this.play_sounds) {
                    this.get_damage_sound.play();
                }
            }
        });
    }


    /**
    * Handles collisions between the character and enemies.
    */
    collisionCharacterEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0) {
                enemy.die();
                if (this.play_sounds) {
                    this.defeat_chicken_sound.play();
                }
                this.character.jumpAndActivateInvincibility();
                return false;
            } else if (this.character.isColliding(enemy)) {
                if (!this.character.isInvincible) {
                    this.character.hit();
                    if (this.play_sounds) {
                        this.get_damage_sound.play();
                    }
                    this.healthStatusbar.setHealthPercentage(this.character.energy);
                }
            }
            return true;
        });
    }


    /**
    * Handles collisions between the character and coins.
    */
    collisionCharacterCoins() {
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinsStatusbar.setCoinPercentage(this.coinsStatusbar.coin_percentage + 10);
                if (this.play_sounds) {
                    this.collect_coins_sound.play();
                }
                return false;
            }
            return true;
        });
    }


    /**
    * Handles collisions between the character and bottles.
    */
    collisionCharacterBottle() {
        this.level.bottles = this.level.bottles.filter((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottlesStatusbar.setBottlePercentage(this.bottlesStatusbar.bottle_percentage + 10);
                if (this.play_sounds) {
                    this.collect_bottle_sound.play();
                }
                return false;
            }
            return true;
        });
    }


    /**
    * Updates the endboss status bar based on the endboss's current health.
    */
    updateStatusBar() {
        this.endbossStatusbar.setEndbossPercentage(this.endbossStatusbar.endboss_percentage - 20);
    }


    /**
    * Starts the game loops for checking collisions and handling thrown objects.
    */
    run() {
        this.clearIntervalsWhileRun();
        this.collisionsIntervall = setInterval(() => {
            this.checkCollisions();
        }, 30);
        this.checkThrowedBottleInterval = setInterval(() => {
            this.checkThrowObjects();
            this.coolDownBottle();
        }, 350);
    }


    /**
    * Checks if a bottle can be thrown and creates a new throwable object if so.
    */
    checkThrowObjects() {
        if (this.bottlesStatusbar.bottle_percentage > 0) {
            if (this.keyboard.F && this.coolDown <= 0) {
                this.coolDown = 60;
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                if (this.play_sounds) {
                    this.throw_bottle_sound.play();
                }
                this.reduceBottleStatusBar();
            }
        }
    }


    /**
    * Manages the cooldown period between throws of bottles.
    */
    coolDownBottle() {
        if (this.coolDown > 0) {
            this.coolDown -= 1000 / 60;
        }
    }


    /**
    * Reduces the bottle percentage in the status bar after throwing a bottle.
    */
    reduceBottleStatusBar() {
        this.bottlesStatusbar.setBottlePercentage(this.bottlesStatusbar.bottle_percentage - 10);
    }


    /**
    * Clears all intervals, effectively stopping all setInterval operations.
    */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }


    /**
    * Clears the intervals related to collision detection and checking for thrown bottles.
    * This method is used to stop the periodic checks during the game loop, ensuring that 
    * the intervals do not continue running when they are no longer needed.
    */
    clearIntervalsWhileRun() {
        clearInterval(this.collisionsIntervall);
        clearInterval(this.checkThrowedBottleInterval);
    }


    /**
    * Clears all intervals and resets the world state, removing all enemies, objects, and clearing active intervals.
    */
    clearWorld() {
        this.clearIntervalsWhileRun();
        this.level.enemies = [];
        this.level.endboss = [];
        this.level.bottles = [];
        this.level.coins = [];
        this.throwableObjects = [];
    }
}