import Player from "./player";
import Map from "./map";
import Menu from "./menu";
import Collactable from "./collactable";
import { starConfig } from "./collactable";

const SPIKE_TILE = 2;
const JUMP_TILE = 3;

export default class MainScene extends Phaser.Scene {
  player: Player;
  map: Map;
  menu: Menu;
  stars: Collactable;
  bombs: Collactable;
  state: boolean;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  newMap: Phaser.Tilemaps.Tilemap;
  debugGraphics: Phaser.GameObjects.Graphics;
  showDebug: Boolean;

  constructor() {
    super("Mainscene");
  }

  preload() {}

  create() {
    // this.add.image(400, 300, "background");
    this.menu = new Menu(this);
    this.map = new Map(this);
    let staticLayer = this.map.staticLayer;
    let objectLayer = this.map.objectLayer;

    this.debugGraphics = this.add.graphics();
    this.showDebug = true;
    // showDebug = !showDebug;
    this.drawDebug();

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
    this.physics.add.collider(
      this.player,
      staticLayer,
      this.player.handleCollision
    );
    this.physics.add.collider(
      this.player,
      objectLayer,
      this.player.handleDynamicCollision
    );
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

    this.input.keyboard.on("keydown_d", this.drawDebug, this);
  }
  update() {
    // check which tile the hero is on
    let yoffset = 30;
    let tile = this.map.tilemap.getTileAtWorldXY(
      this.player.x,
      this.player.y + yoffset,
      true
    );

    if (!tile) {
      this.state = true;
      console.log("you died");
      this.scene.pause();
    } else if (tile.index === SPIKE_TILE) {
    } else if (tile.index === JUMP_TILE) {
      // this.player.jump();
    }

    if (this.state) {
      return;
    }
    this.player.move(this.cursors);
  }
  drawDebug() {
    this.showDebug = !this.showDebug;
    this.debugGraphics.clear();

    if (this.showDebug) {
      // Pass in null for any of the style options to disable drawing that component
      this.map.staticLayer.renderDebug(this.debugGraphics, {
        tileColor: null, // Non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Colliding face edges
      });
    }
  }
}
