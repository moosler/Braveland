import { bombConfig } from "./collactable";
export default class Player extends Phaser.Physics.Arcade.Sprite {
  scene: Phaser.Scene;
  speed: number;
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
    // this.setCollideWorldBounds(true);

    // this.body.onWorldBounds = true;
    /**typscript hack to set onWorldBounds to true */
    (this.body
      .onWorldBounds as Phaser.Physics.Arcade.Body["onWorldBounds"]) = true;
    this.setMaxVelocity(1000);
    this.setBounce(1, 0.2);
    this.createAnimation(this.scene);
    this.setDamping(true);
    this.setDrag(0.97, 1);
    // this.debugShowVelocity = true;
    this.speed = 160;
    this.jumpHeight = -330;
    this.accelartion = 500;
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
    if (cursors.space.isDown) {
      this.setAccelerationX(this.accelartion * this.direction);
    } else {
      this.setAccelerationX(0);
    }

    // if (cursors.up.isDown && this.body.touching.down) {
    //   this.setVelocityY(this.jumpHeight);
    // }
  }
  handleCollision(player, layer) {
    let blockedDown = player.body.blocked.down;
    let blockedLeft = player.body.blocked.left;
    let blockedRight = player.body.blocked.right;
    if (blockedRight) {
      player.direction = -1;
    }
    if (blockedLeft) {
      player.direction = 1;
    }
    let velX = player.body.velocity.x;

    //Animations
    if (velX <= 50 && velX >= -50) {
      player.anims.play("turn");
    } else if (velX > 10) {
      player.anims.play("right");
    } else if (velX < -10) {
      player.anims.play("left");
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
