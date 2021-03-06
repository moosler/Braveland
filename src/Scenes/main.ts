import Player from "../player";
import Map from "../map";
import Collactables from "../collactables";
import Enemies from "../enemies";
import MoveGroup from "../Groups/moveGroup";

const SLOW_TILE = 2;
const FINISH_TILE = 3;
const SPEED_TILE = 4;
const JUMP_TILE = 5;

export default class MainScene extends Phaser.Scene {
  player: Player;
  map: Map;
  state: boolean;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  newMap: Phaser.Tilemaps.Tilemap;
  debugGraphics: Phaser.GameObjects.Graphics;
  showDebug: Boolean;
  stars: Array<Phaser.GameObjects.Sprite>;
  collactablesGroup: Collactables;
  bombs: Phaser.GameObjects.Sprite[];
  enemiesGroup: Enemies;
  mobileGroup: MoveGroup;
  movable: Phaser.GameObjects.Sprite[];

  constructor() {
    super("Mainscene");
  }

  preload() {}

  create() {
    // this.add.image(400, 300, "background");
    this.map = new Map(this);

    let startPos = this.map.getObjectPosition("Player", "start");
    this.player = new Player(this, startPos["x"], startPos["y"], "dude");

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on("keydown-d", this.drawDebug, this);
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

    //Collectables
    this.stars = this.map.tilemap.createFromObjects("Collactables", "star", {
      key: "star",
    });
    this.collactablesGroup = new Collactables(
      this.physics.world,
      this,
      [],
      this.stars
    );

    //Enemies
    this.bombs = this.map.tilemap.createFromObjects("Enemies", "bomb", {
      key: "bomb",
    });
    this.enemiesGroup = new Enemies(this.physics.world, this, [], this.bombs);

    //Moveables
    this.movable = this.map.tilemap.createFromObjects("Move", "spike", {});
    this.mobileGroup = new MoveGroup(
      this.physics.world,
      this,
      [],
      this.movable
    );

    //Camera
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    //Collision
    this.addCollisions();
  }

  addCollisions() {
    let staticLayer = this.map.staticLayer;
    //  Player => static Plattform
    this.physics.add.collider(
      this.player,
      staticLayer,
      this.player.handleCollision
    );
    //  Plattform => Collactables Stars, Coins,
    this.physics.add.collider(this.collactablesGroup, staticLayer);

    //  Plattform => Enemies
    this.physics.add.collider(this.enemiesGroup, staticLayer);

    //  Player => Enemies
    this.physics.add.collider(
      this.enemiesGroup,
      this.player,
      this.player.hitBomb,
      null,
      this
    );
    //  Player => Movables
    // this.physics.add.collider(this.mobileGroup, this.player);

    //  Player => Movable
    this.physics.add.overlap(
      this.player,
      this.mobileGroup,
      this.player.hit.bind(this.player)
    );

    //  Player => Collactables Stars, Coins,
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
    } else if (tile.index === SLOW_TILE) {
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
