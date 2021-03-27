import Phaser from "phaser";
import MainMenu from "./scenes/MainMenu";
import Game from "./scenes/Game";
import WinScreen from "./scenes/WinScreen";
import LoseScreen from "./scenes/LoseScreen";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },
    },
  },
  scene: [MainMenu, Game, WinScreen, LoseScreen]
};

var game = new Phaser.Game(config);
