import Phaser from 'phaser';
import BattleCore from '../../core/battle/battleCore.js';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('battle');
    this.core = new BattleCore();
  }

  create() {
    const size = 32;
    const gridSize = 10;
    const graphics = this.add.graphics({ lineStyle: { width: 1, color: 0xffffff } });
    for (let i = 0; i <= gridSize; i++) {
      graphics.lineBetween(0, i * size, gridSize * size, i * size);
      graphics.lineBetween(i * size, 0, i * size, gridSize * size);
    }

    // simple player and enemy as rectangles
    this.playerRect = this.add.rectangle(size / 2, size / 2, size - 4, size - 4, 0x00ff00);
    this.enemyRect = this.add.rectangle(5 * size + size / 2, 5 * size + size / 2, size - 4, size - 4, 0xff0000);

    this.hpText = this.add.text(10, 300, '');
    this.mpText = this.add.text(80, 300, '');

    this.core.emitter.on('battleStart', ({ player, enemy }) => {
      console.log('Battle started', player, enemy);
      this.hpText.setText(`HP: ${player.hp}`);
      this.mpText.setText(`MP: ${player.mp}`);
    });
    this.core.start();
  }
}
