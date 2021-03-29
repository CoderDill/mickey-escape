import Phaser from "phaser";
import winImage from "../assets/winImage.gif";

let graphics;
let cursors;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "winscreen" });
  },
  preload: function () {
    this.load.image("winImage", winImage);
  },
  create: function () {
    cursors = this.input.keyboard.createCursorKeys();
    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 800, 600);
    this.add.image(400, 300, "winImage");
    this.add.text(275, 40, "You win! Press space to restart.");
  },
  update: function () {
    if (cursors.space.isDown) {
      this.scene.start("mainmenu");
    }
  },
});
