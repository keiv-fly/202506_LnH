import EventEmitter from '../shared/eventEmitter.js';
import { Player, Rat } from './battleEntities.js';

export default class BattleCore {
  constructor() {
    this.emitter = new EventEmitter();
    this.player = new Player();
    this.enemy = new Rat();
    this.gridSize = 10;
  }

  start() {
    this.emitter.emit('battleStart', {
      player: this.player,
      enemy: this.enemy
    });
  }

  movePlayer(dx, dy) {
    const newX = Math.max(0, Math.min(this.player.x + dx, this.gridSize - 1));
    const newY = Math.max(0, Math.min(this.player.y + dy, this.gridSize - 1));
    this.player.x = newX;
    this.player.y = newY;
    this.emitter.emit('playerMove', { x: newX, y: newY });
  }
}
