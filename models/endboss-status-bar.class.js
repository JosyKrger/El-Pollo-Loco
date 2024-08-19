class EndbossStatusbar extends DrawableObejct {
    
    endboss_percentage = 100;
    energy = 100;

    ENDBOSS_STATUS = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.ENDBOSS_STATUS);
        this.x = 520;
        this.y = 0;
        this.width = 180;
        this.height = 50;
        this.setEndbossPercentage(100);
    }


    setEndbossPercentage(percentage) {
        this.endboss_percentage = percentage;
        let path = this.ENDBOSS_STATUS[this.resolveIamgeIndex()];
        this.img = this.imageCache[path];
    }


    resolveIamgeIndex() {
        if (this.endboss_percentage == 100) {
            return 5;
        } else if (this.endboss_percentage == 80) {
            return 4;
        } else if (this.endboss_percentage == 60) {
            return 3;
        } else if (this.endboss_percentage == 40) {
            return 2;
        } else if (this.endboss_percentage == 20) {
            return 1;
        } else {
            return 0;
        }
    }
}