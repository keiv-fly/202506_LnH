import Entity from '../shared/entities.js';

export class Player extends Entity {
  constructor(name = 'Hero', x = 0, y = 4) {
    super(name, x, y, 20);
  }
}

export class Rat extends Entity {
  constructor(name = 'Rat', x = 9, y = 4) {
    super(name, x, y, 5);
  }
}
