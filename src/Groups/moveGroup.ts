import Moveable from "../movable";

export default class MoveGroup extends Phaser.Physics.Arcade.Group {
  spriteFrames: number[];
  constructor(world, scene, children, spriteArray) {
    super(world, scene, children, {
      // allowGravity: false,
      // immovable: true,
    });
    this.scene = scene;
    this.spriteFrames = [308, 309];

    // create our enemies from the sprite array
    this.createMobiles(scene, spriteArray);
  }

  createMobiles(scene, spriteArray) {
    spriteArray.forEach((sprite) => {
      const randNumber =
        Math.floor(Math.random() * this.spriteFrames.length - 1) + 1;
      // create a new enemy
      const mobile = new Moveable(
        scene,
        sprite.x,
        sprite.y,
        this.spriteFrames[randNumber]
      );
      this.add(mobile);
      sprite.destroy();
    });
  }
}
