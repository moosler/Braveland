export let starConfig = {
  key: "star",
  repeat: 1,
  setXY: { x: 100, y: 0, stepX: 70 },
};

export let bombConfig = {
  key: "bomb",
  bounce: 1,
  collildeWorld: true,
  velocity: { x: Phaser.Math.Between(-200, 200), y: 20 },
  gravity: false,
};

export default class Collactable {
  scene: Phaser.Scene;
  object: Phaser.Physics.Arcade.Group;
  // create( [x] [, y] [, key] [, frame] [, visible] [, active])
  constructor(scene, config) {
    this.scene = scene;
    this.object = this.scene.physics.add.group(config);
    this.init();
  }

  init() {
    this.object.children.iterate(function (child: any) {
      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
  }
  create(x, y, config) {
    var obj = this.object.create(x, y, config.key);
    obj.setBounce(config.bounce);
    obj.setCollideWorldBounds(config.collildeWorld);
    obj.setVelocity(config.velocity.x, config.velocity.y);
    obj.allowGravity = config.gravity;
    return obj;
  }
}
