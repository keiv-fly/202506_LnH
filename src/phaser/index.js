import Phaser from 'phaser';
import BattleScene from './scenes/battleScene.js';
import WorldScene from './scenes/worldScene.js';
import CityScene from './scenes/cityScene.js';

const config = {
  type: Phaser.AUTO,
  width: 320,
  height: 320,
  parent: 'game-container',
  scene: [BattleScene, WorldScene, CityScene]
};

new Phaser.Game(config);
