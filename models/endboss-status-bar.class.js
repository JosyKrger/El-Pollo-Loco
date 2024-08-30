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


    /**
    * Creates an instance of the Endboss class.
    * Initializes the endboss with default settings and loads its images.
    */
    constructor() {
        super();
        this.loadImages(this.ENDBOSS_STATUS);
        this.x = 520;
        this.y = 5;
        this.width = 180;
        this.height = 50;
        this.setEndbossPercentage(100);
    }


    /**
    * Sets the percentage of the endboss and updates its image accordingly.
    * 
    * @param {number} percentage - The new percentage value for the endboss.
    */
    setEndbossPercentage(percentage) {
        this.endboss_percentage = percentage;
        let path = this.ENDBOSS_STATUS[this.resolveIamgeIndex()];
        this.img = this.imageCache[path];
    }


    /**
    * Resolves the image index based on the endboss's percentage.
    * 
    * @returns {number} The index of the image corresponding to the endboss's percentage.
    */
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