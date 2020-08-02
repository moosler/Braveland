export default class Moveable extends Phaser.Physics.Arcade.Sprite {
  moveSpeed: number;
  timeEvent: Phaser.Time.TimerEvent;
  constructor(scene, x, y, frame) {
    super(scene, x, y, "movingObjects", frame);
    this.scene = scene;
    this.moveSpeed = 50;

    // enable physics
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setVelocityY(-this.moveSpeed);
    this.timeEvent = this.scene.time.addEvent({
      delay: 1000,
      callback: this.swapVelocity,
      loop: true,
      callbackScope: this,
    });
  }
  swapVelocity() {
    let vel = this.body.velocity;

    this.setVelocityY(vel.y * -1);
  }
}
