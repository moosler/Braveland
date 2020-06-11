export default class Spike extends Phaser.Physics.Arcade.StaticGroup {
  constructor(world, scene) {
    super(world, scene);
    this.scene = scene;
    this.init();
  }
  init() {
    this.create(400, 568, "ground").setScale(6, 1).refreshBody();
    this.create(600, 400, "ground");
    this.create(50, 250, "ground");
    this.create(750, 220, "ground");
  }
}
