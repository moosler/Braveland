export default class Map {
  scene: Phaser.Scene;
  layer: Phaser.Tilemaps.StaticTilemapLayer;
  map: Phaser.Tilemaps.Tilemap;
  width: number;
  height: number;

  constructor(scene) {
    this.scene = scene;
    this.init();
  }
  init() {
    this.map = this.scene.make.tilemap({ key: "level" });
    this.height = this.map.height * this.map.tileHeight;
    this.width = this.map.width * this.map.tileWidth;
    let tile = this.map.addTilesetImage("platform_set", "tile");
    this.layer = this.map.createStaticLayer("Plattform", tile);
    this.layer.setCollisionBetween(1, 3);
  }
}
