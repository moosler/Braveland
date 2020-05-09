export default class Menu {
  scene: Phaser.Scene;
  scoreText: Phaser.GameObjects.Text;
  score: Number;
  constructor(scene) {
    this.scene = scene;
    this.score = 0;
    this.init();
  }
  init() {
    //  The score
    this.scoreText = this.scene.add.text(16, 16, "score: " + this.score, {
      fontSize: "32px",
      fill: "#000",
    });
  }
}
