import Phaser from "phaser";
import background from "../assets/footballField.jpg";
import player from "../assets/peter_griffin_football.png";
import football from "../assets/football.png";
import { accelerate, decelerate } from "../utils";

let box;
let cursors;
let text;
let timedEvent;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "game" });
    window.GAME = this;
  },
  preload: function preload() {
    this.load.image("background", background);

    this.load.image("player", player);

    this.load.image("football", football);
  },
  create: function create() {
    this.add.image(400, 300, "background");

    text = this.add.text(32, 32);
    timedEvent = this.time.addEvent({
      delay: 10000,
      callbackScope: this,
      startAt: 0,
    });

    const footballs = this.physics.add.group({
      key: "football",
      repeat: 11,
      setScale: { x: 0.2, y: 0.2 },
      setXY: { x: 400, y: 300 },
    });

    footballs.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setVelocityX(150 - Math.random() * 300);
      child.setVelocityY(150 - Math.random() * 300);
      child.setBounce(1, 1);
      child.setCollideWorldBounds(true);
    });

    cursors = this.input.keyboard.createCursorKeys();

    box = this.physics.add.image(400, 100, "player", 15).setScale(0.35, 0.35);

    const processCollision = (box, football) => {
      football.destroy();
      const footballsLeft = footballs.countActive();
      if (footballsLeft === 0) {
        this.scene.start("winscreen");
      }
    };

    this.physics.add.collider(footballs, box, processCollision, null, this);

    box.setBounce(1, 1);
    box.setCollideWorldBounds(true);
  },
  update: function () {
    const { velocity } = box.body;

    if (cursors.space.isDown) {
      const x = decelerate(velocity.x);
      const y = decelerate(velocity.y);
      box.setVelocity(x, y);
    }

    if (cursors.up.isDown) box.setVelocityY(accelerate(velocity.y, -1));
    if (cursors.right.isDown) box.setVelocityX(accelerate(velocity.x, 1));
    if (cursors.down.isDown) box.setVelocityY(accelerate(velocity.y, 1));
    if (cursors.left.isDown) box.setVelocityX(accelerate(velocity.x, -1));

    text.setText("Timer: " + timedEvent.getProgress().toString().substr(0, 4));
  },
});
