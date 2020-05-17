/**
 * https://github.com/photonstorm/phaser3-typescript-project-template
 */

import "phaser";
import Player from "./player";
import Map from "./map";
import Menu from "./menu";
import Collactable from "./collactable";
import { starConfig } from "./collactable";

export default class MainScene extends Phaser.Scene {
  player: Player;
  map: Map;
  menu: Menu;
  stars: Collactable;
  bombs: Collactable;
  state: false;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: "Mainscene" });
  }

  preload() {
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
  }

  create() {
    // this.add.image(400, 300, "sky");
    this.menu = new Menu(this);
    this.map = new Map(this);
    this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
    this.physics.world.setBounds(0, 0, this.map.width, this.map.height);
    this.physics.world.setBoundsCollision(true, true, true, false);

    // this.player.collectStar(1);
    this.stars = new Collactable(this, starConfig);
    this.bombs = new Collactable(this, {});
    this.player = new Player(this, 100, 450, "dude");
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, this.map.platforms);
    this.physics.add.collider(this.stars.object, this.map.platforms);
    this.physics.add.collider(this.bombs.object, this.map.platforms);

    this.physics.add.overlap(
      this.player,
      this.stars.object,
      this.player.collectStar,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.bombs.object,
      this.player.hitBomb,
      null,
      this
    );
    this.physics.world.on(
      "worldbounds",
      function () {
        this.bounce();
      },
      this.player
    );
  }
  update() {
    if (this.state) {
      return;
    }
    this.player.move(this.cursors);
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 800,
  height: 600,
  scene: MainScene,
  parent: "phaser-example",
  //   physics: {
  //     default: "matter",
  //   },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);
// console.log(game.scene.scenes);
