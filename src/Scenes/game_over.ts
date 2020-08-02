export default class gameOverScene extends Phaser.Scene {
  scoreText: Phaser.GameObjects.Text;
  mainScene: Phaser.Scene;

  constructor() {
    super({ key: "gameOverScene", active: false });
  }

  init() {}

  create() {
    // create score text
    this.scoreText = this.add.text(10, 10, `Game Over Bro`, {
      fontSize: "32px",
      fill: "#fff",
    });
    // reference to the main scene
    this.mainScene = this.scene.get("Mainscene");
  }
}
