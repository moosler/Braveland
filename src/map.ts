export default class Map {
  scene: Phaser.Scene;
  platforms: any;
  width: number;
  height: number;

  constructor(scene) {
    this.scene = scene;
    this.platforms = scene.physics.add.staticGroup();
    this.width = 800;
    this.height = 600;
    this.init();
  }
  init() {
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");
  }
}
