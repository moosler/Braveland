export default class Map {
  scene: Phaser.Scene;
  staticLayer: Phaser.Tilemaps.StaticTilemapLayer;
  objectLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  tilemap: Phaser.Tilemaps.Tilemap;
  width: number;
  height: number;

  constructor(scene) {
    this.scene = scene;
    this.init();
  }
  init() {
    this.tilemap = this.scene.make.tilemap({ key: "level" });
    this.height = this.tilemap.height * this.tilemap.tileHeight;
    this.width = this.tilemap.width * this.tilemap.tileWidth;
    let tile = this.tilemap.addTilesetImage("platform_set", "tile");
    this.staticLayer = this.tilemap.createStaticLayer("Plattform", tile);
    this.staticLayer.setCollisionBetween(1, 3);
    // this.staticLayer.setTileIndexCallback(1, this.collision, this);

    let moveObjects = this.tilemap.addTilesetImage(
      "kenny_set",
      "movingObjects"
    );
    this.objectLayer = this.tilemap.createDynamicLayer("Objects", moveObjects);
    // this.objectLayer.setCollision([280, 281, 308, 309]);
    this.objectLayer.setCollisionBetween(284, 285);
    this.objectLayer.setTileIndexCallback(284, this.collision, this);

    // https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/
    // https://phaser.io/examples/v3/view/game-objects/tilemap/static/tileset-collision-shapes#
    // https://labs.phaser.io/edit.html?src=src/game%20objects/tilemap/collision/tile%20callbacks.js&v=3.23.0
    // We want the player to physically collide with the ground, but the coin layer should only
    // trigger an overlap so that collection a coin doesn'td kill player movement.
    //  this.physics.add.collider(player, groundLayer);
    //  this.physics.add.overlap(player, coinLayer);
    //  groundLayer.setTileLocationCallback(2, 0, 1, 1, hitSecretDoor, this);
  }

  collision() {
    console.log("collision Map");
  }
}
