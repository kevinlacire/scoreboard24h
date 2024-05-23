import 'phaser'
import basketball_court from '../Assets/img/basketball_court.jpg'
import ball from '../Assets/img/ball.png'
import ground from '../Assets/img/ground.png'
import { gameOptions } from '../Config/Config'

export class GameScene extends Phaser.Scene {
	private CANVAS!: Phaser.Game["canvas"]

	constructor() {
		super({
			key: 'GameScene'
		})
	}

	preload(): void {
		this.load.image('basketball_court', basketball_court);
		this.load.image('ball', ball);
		this.load.image('ground', ground);
	}

	create(): void {
		const scale = 0.5;
		const centerX = this.game.config.width / 2;
		const centerY = this.game.config.height / 2;

		this.CANVAS = this.sys.game.canvas;

		this.basketball_court = this.add.image(centerX, centerY, 'basketball_court');
		this.basketball_court.setScale(scale);

		this.ground = this.physics.add.staticGroup();
		this.ground.create(centerX, centerY + 300, 'ground').refreshBody();

		this.ball = this.physics.add.image(centerX, centerY, 'ball');
        this.ball.body.gravity.y = gameOptions.ballGravity;
		this.ball.setVelocityX(10);
        this.ball.setBounce(0.8);
        this.ball.setCircle(25);
		this.ball.setScale(0.02);
		this.ball.setCollideWorldBounds(true);

		this.physics.add.collider(this.ball, this.ground);

		// Go voir trackmaniac
	}

	update(): void {
	}
}