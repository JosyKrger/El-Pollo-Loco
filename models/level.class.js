class Level {
    enemies;
    endboss;
    backgroundObjects;
    clouds;
    bottles;
    coins;
    level_end_x = 6000;


    /**
    * Creates an instance of the Level class.
    * Initializes the level with enemies, an endboss, background objects, clouds, bottles, and coins.
    * 
    * @param {Array<Enemy>} enemies - An array of enemy objects in the level.
    * @param {Endboss} endboss - The endboss object in the level.
    * @param {Array<BackgroundObject>} backgroundObjects - An array of background objects in the level.
    * @param {Array<Cloud>} clouds - An array of cloud objects in the level.
    * @param {Array<Bottle>} bottles - An array of bottle objects in the level.
    * @param {Array<Coin>} coins - An array of coin objects in the level.
    */
    constructor(enemies, endboss, backgroundObjects, clouds, bottles, coins) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
    }
}