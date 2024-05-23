import 'phaser';
import { GameScene } from '../Scenes/GameScene';

export const config: Phaser.Types.Core.GameConfig = {
    title: "New Game",
    version: '1.0',
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    parent: 'game', // needs a div as id="game"
    scene: [
      GameScene
    ],
    input: {
      keyboard: true
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    backgroundColor: '#ffffff',
    render: { pixelArt: false, antialias: true }
  };

export const gameOptions = {
  bounceHeight: 300,
  ballGravity: 1200,
  ballPower: 1200
};
