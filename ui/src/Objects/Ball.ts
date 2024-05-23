import Phaser from "phaser";

export default class Ball extends Phaser.GameObjects.Image {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'ball');
    }


}