/**
 * https://github.com/photonstorm/phaser3-typescript-project-template
 */

import "phaser";
import preloadScene from "./Scenes/preload";
import mainScene from "./Scenes/main";
import uiScene from "./Scenes/ui";

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#444444",
  width: 800,
  height: 600,
  scene: [preloadScene, mainScene, uiScene],
  parent: "Braveland",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);
