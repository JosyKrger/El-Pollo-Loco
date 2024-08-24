class Level {
    enemies;
    endboss;
    backgroundObjects;
    clouds;
    bottles;
    coins;
    level_end_x = 6000;

    constructor(enemies, endboss, backgroundObjects, clouds, bottles, coins) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
    }
}