let level1;

function initLevel() {

    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chick(),
            new Chick(),
            new Chick(),
            new Chick(),
            new Chick()
        ],
        [
            new Endboss()
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -1440),
            new BackgroundObject('img/5_background/layers/air.png', -720),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -1440),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -1440),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -1440),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 720),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720),

            new BackgroundObject('img/5_background/layers/air.png', 1440),
            new BackgroundObject('img/5_background/layers/air.png', 2160),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1440),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1440),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1440),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2160),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2160),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2160),

            new BackgroundObject('img/5_background/layers/air.png', 2880),
            new BackgroundObject('img/5_background/layers/air.png', 3600),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2880),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2880),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2880),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 3600),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 3600),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 3600),

            new BackgroundObject('img/5_background/layers/air.png', 4320),
            new BackgroundObject('img/5_background/layers/air.png', 5040),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 4320),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 4320),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 4320),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 5040),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 5040),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 5040),

            new BackgroundObject('img/5_background/layers/air.png', 5760),
            new BackgroundObject('img/5_background/layers/air.png', 6480),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 5760),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 5760),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 5760),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 6480),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 6480),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 6480)

        ],
        [
            new Cloud()
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ]
    );
}
