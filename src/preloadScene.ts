export default class preloadScene extends Phaser.Scene {
  constructor() {
    super("preloadScene");
  }
  preload() {
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image("background", "assets/background.jpg");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.image("tile", "assets/tile.png");
    this.load.image("movingObjects", "assets/platformPack_tilesheet.png");
    this.load.tilemapTiledJSON("level", "assets/maps/level1.json");
  }
  create() {
    this.scene.start("Mainscene");
  }
}
