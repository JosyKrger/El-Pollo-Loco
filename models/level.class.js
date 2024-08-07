class Level {
    enemies;
    backgroundObjects;
    clouds;
    bottles;
    coins;
    level_end_x = 6000;

    constructor(enemies, backgroundObjects, clouds, bottles, coins) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
    }
}