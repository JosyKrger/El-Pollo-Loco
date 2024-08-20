class HealthStatusbar extends DrawableObejct {
    
    health_percentage = 100;


    HEALTH_STATUS = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.HEALTH_STATUS);
        this.x = 10;
        this.y = 0;
        this.width = 180;
        this.height = 50;
        this.setHealthPercentage(100);
    }

    setHealthPercentage(percentage) {
        this.health_percentage = percentage;
        let path = this.HEALTH_STATUS[this.resolveIamgeIndex()];
        this.img = this.imageCache[path];
    }


    resolveIamgeIndex() {
        if (this.health_percentage == 100) {
            return 5;
        } else if (this.health_percentage > 80) {
            return 4;
        } else if (this.health_percentage > 60) {
            return 3;
        } else if (this.health_percentage > 40) {
            return 2;
        } else if (this.health_percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}