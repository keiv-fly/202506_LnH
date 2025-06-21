import Phaser from 'phaser';
import BattleCore from '../../core/battle/battleCore.js';
import createDirectionButtons from '../ui/battle/directionButtons.js';

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
    this.playerRect = this.add.rectangle(size / 2, 4 * size + size / 2, size - 4, size - 4, 0x00ff00);
    this.enemyRect = this.add.rectangle(9 * size + size / 2, 4 * size + size / 2, size - 4, size - 4, 0xff0000);

    this.core.emitter.on('battleStart', ({ player, enemy }) => {
      console.log('Battle started', player, enemy);
    });
    this.core.start();

    const onMove = (dx, dy) => {
      const newX = Phaser.Math.Clamp(this.core.player.x + dx, 0, gridSize - 1);
      const newY = Phaser.Math.Clamp(this.core.player.y + dy, 0, gridSize - 1);
      this.core.player.x = newX;
      this.core.player.y = newY;
      this.playerRect.setPosition(newX * size + size / 2, newY * size + size / 2);
    };

    this.directionUI = createDirectionButtons(this, onMove);
  }
}
