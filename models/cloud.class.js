class Cloud extends MoveableObject {

    y = 30;
    height = 190;
    width = 570;
    speed = 0.3;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 20 + Math.random() * 600;
        this.animate();
    }


    animate() {
        this.moveLeft();
    }

}