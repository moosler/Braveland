export default class uiScene extends Phaser.Scene {
  points: number;
  scoreText: Phaser.GameObjects.Text;
  mainScene: Phaser.Scene;
  constructor() {
    super({ key: "UIScene", active: true });
  }

  init() {
    this.points = 0;
  }

  create() {
    // create score text
    this.scoreText = this.add.text(10, 10, `Score: ${this.points}`, {
      fontSize: "32px",
      fill: "#fff",
    });

    // reference to the main scene
    this.mainScene = this.scene.get("Mainscene");

    // listen for events
    this.mainScene.events.on("objCollected", () => {
      this.points++;
      this.scoreText.setText(`Score: ${this.points}`);
    });

    this.mainScene.events.on("newGame", () => {
      this.points = 0;
      this.scoreText.setText(`Score: ${this.points}`);
    });
  }
}
