import EventEmitter from '../shared/eventEmitter.js';
import { Player, Rat } from './battleEntities.js';

export default class BattleCore {
  constructor() {
    this.emitter = new EventEmitter();
    this.player = new Player();
    this.enemy = new Rat();
  }

  start() {
    this.emitter.emit('battleStart', {
      player: this.player,
      enemy: this.enemy
    });
  }
}
