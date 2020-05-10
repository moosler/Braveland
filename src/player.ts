import { bombConfig } from "./collactable";
export default class Player extends Phaser.Physics.Arcade.Sprite {
  scene: Phaser.Scene;
  stepWidth: number;
  jumpHeight: number;
  accelartion: number;
  direction: number;

  /**
   * 
    var group = this.physics.add.group({
        key: 'ball',
        frameQuantity: 48,
        bounceX: 1,
        bounceY: 1,
        collideWorldBounds: true,
        velocityX: 180,
        velocityY: 120,
    });
   */

  constructor(scene, x, y, textureName) {
    super(scene, x, y, textureName);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);

    // this.body.onWorldBounds = true;
    /**typscript hack to set onWorldBounds to true */
    (this.body
      .onWorldBounds as Phaser.Physics.Arcade.Body["onWorldBounds"]) = true;
    this.setMaxVelocity(1000);
    this.setBounce(1, 0.2);
    this.createAnimation(this.scene);
    // this.debugShowVelocity = true;
    this.stepWidth = 160;
    this.jumpHeight = -330;
    this.accelartion = 100;
    this.direction = 1;
    // this.init();
  }
  init() {}
  collectStar(player, obj) {
    let scene: any = player.scene;
    let bombs: any = scene.bombs;
    let stars: any = scene.stars.object;
    let menu: any = scene.menu;
    let text: any = menu.scoreText;
    obj.disableBody(true, true);
    menu.score += 10;
    text.setText("Score: " + menu.score);
    if (stars.countActive(true) === 0) {
      stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });
      var x =
        this.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      bombs.create(x, 16, bombConfig);
    }
  }
  hitBomb(player, obj) {
    let scene: any = player.scene;
    scene.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");
    scene.state = true;
  }
  move(cursors) {
    if (cursors.left.isDown) {
      this.setVelocityX(-this.stepWidth);
      this.anims.play("left", true);
    } else if (cursors.right.isDown) {
      this.setVelocityX(this.stepWidth);
      this.anims.play("right", true);
    } else if (cursors.space.isDown) {
      this.setAccelerationX(this.accelartion * this.direction);
    } else {
      // this.setVelocityX(0);
      this.anims.play("turn");
    }

    if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(this.jumpHeight);
    }
  }

  createAnimation(scene) {
    //  Our player animations, turning, walking left and walking right.
    scene.anims.create({
      key: "left",
      frames: scene.anims.generateFrameNumbers("dude", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers("dude", {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
