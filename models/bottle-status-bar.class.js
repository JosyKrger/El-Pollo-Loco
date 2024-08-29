class BottleStatusbar extends DrawableObejct {


    bottle_percentage = 0;


    BOTTLE_STATUS = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.BOTTLE_STATUS);
        this.x = 10;
        this.y = 90;
        this.width = 180;
        this.height = 50;
        this.setBottlePercentage(this.bottle_percentage);
    }


    setBottlePercentage(percentage) {
        this.bottle_percentage = percentage;
        let path = this.BOTTLE_STATUS[this.resolveIamgeIndex()];
        this.img = this.imageCache[path];
    }


    resolveIamgeIndex() {
        if (this.bottle_percentage == 100) {
            return 5;
        } else if (this.bottle_percentage >= 80) {
            return 4;
        } else if (this.bottle_percentage >= 60) {
            return 3;
        } else if (this.bottle_percentage >= 40) {
            return 2;
        } else if (this.bottle_percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}