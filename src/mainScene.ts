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
  state: boolean;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  newMap: Phaser.Tilemaps.Tilemap;

  constructor() {
    super("Mainscene");
  }

  preload() {}

  create() {
    // this.add.image(400, 300, "sky");
    this.menu = new Menu(this);
    this.map = new Map(this);
    let layer = this.map.layer;

    this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
    this.physics.world.setBounds(0, 0, this.map.width, this.map.height);
    this.physics.world.setBoundsCollision(true, true, true, false);

    // this.player.collectStar(1);
    this.stars = new Collactable(this, starConfig);
    this.bombs = new Collactable(this, {});
    this.player = new Player(this, 100, 350, "dude");
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, layer, this.player.handleCollision);
    // this.physics.add.collider(this.stars.object, layer);
    // this.physics.add.collider(this.bombs.object, layer);
    // this.physics.add.collider(
    //   this.player,
    //   this.bombs.object,
    //   this.player.hitBomb,
    //   null,
    //   this
    // );

    this.physics.add.overlap(
      this.player,
      this.stars.object,
      this.player.collectStar,
      null,
      this
    );

    // this.physics.world.on(
    //   "worldbounds",
    //   function () {
    //     this.bounce();
    //   },
    //   this.player
    // );
  }
  update() {
    // check which tile the hero is on
    let tile = this.map.tilemap.getTileAtWorldXY(
      this.player.x,
      this.player.y,
      true
    );
    console.log(tile.index);
    if (!tile) {
      this.state = true;
    }

    if (this.state) {
      return;
    }
    this.player.move(this.cursors);
  }
}
