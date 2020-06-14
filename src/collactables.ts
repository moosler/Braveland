export default class Collactables extends Phaser.Physics.Arcade.Group {
  constructor(world, scene, children, spriteArray) {
    super(world, scene);
    this.scene = scene;

    spriteArray.forEach((obj) => {
      this.create(obj);
    });
  }

  collect(player, obj) {
    this.remove(obj);
    obj.destroy();
    // dispatch an event
    this.scene.events.emit("objCollected");
    if (!this.children.entries || 0 === this.children.entries.length) {
      this.scene.events.emit("createEnemy");
    }
  }

  create(obj) {
    obj.setOrigin(0);
    //add this method at first! if not, the object will be overwritten with the default values of the group
    this.add(obj);
    //Adds an Arcade Physics Body to a Game Object, Now .body is accessible
    this.scene.physics.world.enable(obj);
    obj.body.setCollideWorldBounds(true);
    obj.body.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    this.scene.add.existing(obj);
  }
}
