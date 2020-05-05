export default class Player extends Phaser.GameObjects.Sprite {
  constructor(MainScene) {
    super(MainScene, 100, 450, "dude");
    MainScene.add.existing(this);
  }
}
