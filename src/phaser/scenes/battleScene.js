import Phaser from 'phaser';
import BattleCore from '../../core/battle/battleCore.js';
import createDirectionButtons from '../ui/battle/directionButtons.js';
import createTurnLog from '../ui/battle/turnLog.js';

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

    this.turnLog = createTurnLog(this);

    this.core.emitter.on('battleStart', () => {
      this.turnLog.addMessage('Battle started');
    });

    this.core.emitter.on('playerMove', ({ x, y }) => {
      this.playerRect.setPosition(x * size + size / 2, y * size + size / 2);
      this.turnLog.addMessage(`Player moved to (${x}, ${y})`);
    });

    this.core.start();

    this.directionUI = createDirectionButtons(this, (dx, dy) => this.core.movePlayer(dx, dy));
  }
}
