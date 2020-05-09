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
    this.add.image(400, 300, "sky");
    this.map = new Map(this);
    this.menu = new Menu(this);
    // this.player.collectStar(1);
    this.stars = new Collactable(this, starConfig);
    this.bombs = new Collactable(this, {});
    this.player = new Player(this, 100, 450, "dude");

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    // bombs = this.physics.add.group();

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
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
