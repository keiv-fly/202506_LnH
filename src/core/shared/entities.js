export default class Entity {
  constructor(name, x = 0, y = 0, hp = 10) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.hp = hp;
  }
}
