export default class Map {
  scene: Phaser.Scene;
  platforms: any;
  spikes: Phaser.Physics.Arcade.StaticGroup;
  width: number;
  height: number;

  constructor(scene) {
    this.scene = scene;
    this.platforms = scene.physics.add.staticGroup();
    this.spikes = scene.physics.add.staticGroup();
    this.width = 1800;
    this.height = 600;
    this.init();
  }
  init() {
    this.platforms.create(400, 568, "ground").setScale(6, 1).refreshBody();
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");
  }
}
