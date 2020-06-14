export default class Player extends Phaser.Physics.Arcade.Sprite {
  scene: Phaser.Scene;
  speed: number;
  jumpHeight: number;
  accelartion: number;
  direction: number;

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
    this.setGravityY(300);
    // this.debugShowVelocity = true;
    this.speed = 160;
    this.jumpHeight = 330;
    this.accelartion = 500;
    this.direction = 1;

    // this.init();
  }
  init() {}
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
  jump() {
    this.body.velocity.y = -this.jumpHeight;
  }

  handlePalyerHitsTile() {
    let blockedDown = this.body.blocked.down;
    let blockedLeft = this.body.blocked.left;
    let blockedRight = this.body.blocked.right;
    if (blockedRight) {
      this.direction = -1;
    }
    if (blockedLeft) {
      this.direction = 1;
    }
    let velX = this.body.velocity.x;

    //Animations
    if (velX <= 50 && velX >= -50) {
      this.anims.play("turn");
      // player.body.velocity.x = 0;
    } else if (velX > 10) {
      this.anims.play("right");
    } else if (velX < -10) {
      this.anims.play("left");
    }
  }

  handleCollision(player, layer) {
    player.handlePalyerHitsTile();
  }

  handleDynamicCollision(player, layer) {
    console.log("collision2");
    player.handlePalyerHitsTile();
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
