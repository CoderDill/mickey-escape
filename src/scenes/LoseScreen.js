import Phaser from "phaser";
import gameover from "../assets/gameover.png"

let graphics;
let cursors;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: 'losescreen' });
  },
  preload: function() {
    this.load.image('gameover', gameover)
  },
  create: function() {
    cursors = this.input.keyboard.createCursorKeys();

    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 800, 600);
    this.add.image(400, 250, "gameover")
    // this.add.text(275, 300, "You lose! Press space to try again.")
  },
  update: function () {

    if (cursors.space.isDown) {
      this.scene.start('mainmenu');
    }
  }
})