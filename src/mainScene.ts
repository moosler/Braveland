import Player from "./player";
import Map from "./map";
import Menu from "./menu";
import Collactable from "./collactable";
import Collactables from "./collactables";
import { starConfig } from "./collactable";

const SPIKE_TILE = 2;
const JUMP_TILE = 3;

export default class MainScene extends Phaser.Scene {
  player: Player;
  map: Map;
  menu: Menu;
  bombs: Collactable;
  state: boolean;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  newMap: Phaser.Tilemaps.Tilemap;
  debugGraphics: Phaser.GameObjects.Graphics;
  showDebug: Boolean;
  stars: Array<Phaser.GameObjects.Sprite>;
  collactablesGroup: Collactables;

  constructor() {
    super("Mainscene");
  }

  preload() {}

  create() {
    // this.add.image(400, 300, "background");
    this.menu = new Menu(this);
    this.map = new Map(this);

    let startPos = this.map.getObjectPosition("Player", "start");
    this.player = new Player(this, startPos["x"], startPos["y"], "dude");

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on("keydown_d", this.drawDebug, this);
    /** Second Variation to create Key Codes */
    // this.spaceKey = this.input.keyboard.addKey(
    //   Phaser.Input.Keyboard.KeyCodes.SPACE
    // );
    // //in Update
    //  if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
    //  }

    /** For Debugging */
    this.debugGraphics = this.add.graphics();
    this.showDebug = true;
    this.drawDebug();

    this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
    this.physics.world.setBounds(0, 0, this.map.width, this.map.height);
    this.physics.world.setBoundsCollision(true, true, true, false);

    this.stars = this.map.tilemap.createFromObjects("Collactables", "star", {
      key: "star",
    });
    this.collactablesGroup = new Collactables(
      this.physics.world,
      this,
      [],
      this.stars
    );

    this.bombs = new Collactable(this, {});
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    this.addCollisions();

    // this.physics.world.on(
    //   "worldbounds",
    //   function () {
    //     this.bounce();
    //   },
    //   this.player
    // );
  }

  addCollisions() {
    let staticLayer = this.map.staticLayer;
    let objectLayer = this.map.objectLayer;
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
    this.physics.add.collider(this.collactablesGroup, staticLayer);
    // this.physics.add.collider(this.bombs.object, layer);
    // this.physics.add.collider(
    //   this.player,
    //   this.bombs.object,
    //   this.player.hitBomb,
    //   null,
    //   this
    // );
    this.physics.add.overlap(
      this.collactablesGroup,
      this.player,
      this.collactablesGroup.collect.bind(this.collactablesGroup)
    );
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
