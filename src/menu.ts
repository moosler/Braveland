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
    this.scoreText = this.scene.add.text(10, 50, "Score: " + this.score, {
      fontSize: "32px",
      fill: "#FFF",
    });
  }
}
