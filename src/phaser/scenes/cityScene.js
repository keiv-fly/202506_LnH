import Phaser from 'phaser';
export default class CityScene extends Phaser.Scene {
  constructor() {
    super('city');
  }
  create() {
    this.add.text(10, 10, 'City Scene');
  }
}
