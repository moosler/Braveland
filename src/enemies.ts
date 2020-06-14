export default class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(world, scene, children, spriteArray) {
    super(world, scene);
    this.scene = scene;

    spriteArray.forEach((obj) => {
      this.create(obj);
    });

    this.scene.events.on("createEnemy", () => {
      console.log("all Stars collected");
      let spr = this.scene.physics.add.sprite(260, 0, "bomb");
      this.create(spr);
    });
  }

  hit(player, obj) {
    console.log("hit");
    this.remove(obj);
    obj.destroy();
    // dispatch an event
    // this.scene.events.emit("objCollected");
  }
  create(obj) {
    obj.setOrigin(0);

    //add this method at first! if not, the object will be overwritten with the default values of the group
    this.add(obj);
    //Adds an Arcade Physics Body to a Game Object, Now .body is accessible
    this.scene.physics.world.enable(obj);
    obj.body.setCollideWorldBounds(true);
    obj.body.setBounce(1);
    obj.body.setVelocity(Phaser.Math.Between(-50, 50), 20);
    obj.body.setGravityY(300);

    // obj.body.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    this.scene.add.existing(obj);
  }
}
