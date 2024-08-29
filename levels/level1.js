let level1;

function initLevel() {

    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chick(),
            new Chick(),
            new Chick(),
            new Chick(),
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
            new Bottle(500),
            new Bottle(1000),
            new Bottle(1600),
            new Bottle(2200),
            new Bottle(2600),
            new Bottle(3000),
            new Bottle(3300),
            new Bottle(3800),
            new Bottle(4100),
            new Bottle(4600)
        ],
        [
            new Coin(500, 250),
            new Coin(650, 220),
            new Coin(800, 270),
            new Coin(1100, 250),
            new Coin(1200, 200),
            new Coin(1300, 150),
            new Coin(1400, 150),
            new Coin(1500, 200),
            new Coin(1600, 250),
            new Coin(1900, 240),
            new Coin(2100, 210),
            new Coin(2400, 260),
            new Coin(2900, 200),
            new Coin(3500, 230),
        ]
    );
}
