export default class Map {
  scene: Phaser.Scene;
  layer: Phaser.Tilemaps.StaticTilemapLayer;
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
    this.layer = this.tilemap.createStaticLayer("Plattform", tile);
    this.layer.setCollisionBetween(1, 3);
  }
}
