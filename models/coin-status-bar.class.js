class CoinStatusbar extends DrawableObejct {

    coin_percentage = 0;

    COIN_STATUS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.COIN_STATUS);
        this.x = 10;
        this.y = 45;
        this.width = 180;
        this.height = 50;
        this.setCoinPercentage(this.coin_percentage);
    }


    setCoinPercentage(percentage) {
        this.coin_percentage = percentage;
        let path = this.COIN_STATUS[this.resolveIamgeIndex()];
        this.img = this.imageCache[path];
    }


    resolveIamgeIndex() {
        if (this.coin_percentage == 100) {
            return 5;
        } else if (this.coin_percentage >= 80) {
            return 4;
        } else if (this.coin_percentage >= 60) {
            return 3;
        } else if (this.coin_percentage >= 40) {
            return 2;
        } else if (this.coin_percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}