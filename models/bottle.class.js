class Bottle extends MoveableObject {

    height = 55;
    width = 60;

    constructor() {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');

        this.x = 300 + Math.random() * 3000;
        this.y = 100 + Math.random() * 150;
    }
}