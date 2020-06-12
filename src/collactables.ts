export default class Collactables extends Phaser.Physics.Arcade.Group {
  constructor(world, scene, children, spriteArray) {
    super(world, scene);
    this.scene = scene;

    // add coins to our group
    spriteArray.forEach((obj) => {
      obj.setOrigin(0);
      // enable physics
      this.scene.physics.world.enable(obj);
      // add our player to the scene
      this.scene.add.existing(obj);
      //   obj.body.setSize(
      //     obj.width * obj.scaleX,
      //     obj.height * obj.scaleY,
      //     true
      //   );
      obj.body.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      this.add(obj);
    });
  }

  collect(player, obj) {
    console.log("collected");

    this.remove(obj);
    obj.destroy();
    // dispatch an event
    // this.scene.events.emit("objCollected");

    //      let scene: any = player.scene;
    //      let bombs: any = scene.bombs;
    //      let stars: any = scene.stars.object;
    //      let menu: any = scene.menu;
    //      let text: any = menu.scoreText;
    //      obj.disableBody(true, true);
    //      menu.score += 10;
    //      text.setText("Score: " + menu.score);
    //      if (stars.countActive(true) === 0) {
    //        stars.children.iterate(function (child) {
    //          child.enableBody(true, child.x, 0, true, true);
    //        });
    //        var x =
    //          this.x < 400
    //            ? Phaser.Math.Between(400, 800)
    //            : Phaser.Math.Between(0, 400);

    //        bombs.create(x, 16, bombConfig);
    //      }
  }
}
