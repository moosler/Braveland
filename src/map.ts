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

    //add static Layer
    let tile = this.tilemap.addTilesetImage("platform_set", "tile");
    let total = tile.total;
    this.staticLayer = this.tilemap.createStaticLayer("Plattform", tile);
    this.staticLayer.setCollisionBetween(1, 3);

    // this.staticLayer.setTileIndexCallback(1, this.collision, this);

    //add dynamic layer
    let moveObjects = this.tilemap.addTilesetImage(
      "kenny_set",
      "movingObjects"
    );
    this.objectLayer = this.tilemap.createDynamicLayer("Objects", moveObjects);
    // this.objectLayer.setCollision([280, 281, 308, 309]);
    let start1 = total + 280 + 1;
    let end1 = total + 281 + 1;
    let start2 = total + 308 + 1;
    let end2 = total + 309 + 1;
    this.objectLayer.setCollisionBetween(start1, end1);
    this.objectLayer.setCollisionBetween(start2, end2);
    this.objectLayer.setTileIndexCallback(start1, this.collision, this);

    // this.blockedLayer.setCollisionByExclusion([-1]);

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

  getObjectPosition(objectName, type) {
    let startPos = null;
    this.tilemap.findObject(objectName, (obj) => {
      let fixedObj: any = obj;
      let x = fixedObj.x;
      let y = fixedObj.y;
      if (obj.type === type) {
        startPos = { x: x, y: y };
      }
    });
    return startPos;
  }
}
