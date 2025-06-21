import Phaser from 'phaser';
export default class WorldScene extends Phaser.Scene {
  constructor() {
    super('world');
  }
  create() {
    this.add.text(10, 10, 'World Scene');
  }
}
