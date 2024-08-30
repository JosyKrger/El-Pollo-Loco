class Cloud extends MoveableObject {

    y = 30;
    height = 190;
    width = 570;
    speed = 0.3;


    /**
     * Creates an instance of Cloud.
     * Initializes the cloud with a random horizontal position and starts its movement to the left.
     * 
     * @constructor
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 20 + Math.random() * 600;
        this.animate();
    }


    /**
     * Starts the cloud's movement to the left.
     */
    animate() {
        this.moveLeft();
    }

}