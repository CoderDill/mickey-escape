import Phaser from "phaser";
import background from "../assets/castle.jpg";
import player from "../assets/mickey.png";
import ghost from "../assets/ghost.png";
import key from "../assets/key.png";
import door from "../assets/door.png";

import { accelerate, decelerate } from "../utils";

let mickey;
let cursors;
let text;
let timedEvent;
let hasKey = false;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "game" });
    window.GAME = this;
  },
  preload: function preload() {
    this.load.image("background", background);

    this.load.image("player", player);

    this.load.image("ghost", ghost);

    this.load.image("key", key);

    this.load.image("door", door);
  },
  create: function create() {
    this.add.image(400, 300, "background");
    text = this.add.text(32, 32);
    timedEvent = this.time.addEvent({
      delay: 10000,
      callbackScope: this,
      startAt: 0,
    });

    const ghosts = this.physics.add.group({
      key: "ghost",
      repeat: 7,
      setScale: { x: 0.2, y: 0.2 },
      setXY: { x: 400, y: 300 },
    });

    const castleDoor =     this.physics.add.group({
      key: 'door',
      setScale: {x: 0.4, y: 0.4},
      setXY: { x:738, y: 500}
    })

    const doorKey = this.physics.add.group({
      key: "key",
      repeat: 1,
      setScale: { x: 0.5, y: 0.5 },
      setXY: { x: 50, y: 445 },
    });

    ghosts.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setVelocityX(150 - Math.random() * 300);
      child.setVelocityY(150 - Math.random() * 300);
      child.setBounce(1, 1);
      child.setCollideWorldBounds(true);
    });

    cursors = this.input.keyboard.createCursorKeys();

    mickey = this.physics.add
      .image(400, 100, "player", 15)
      .setScale(0.35, 0.35);

    const processCollision = (mickey, ghost) => {
      this.scene.start("losescreen");
      hasKey = false;
    };

    const getKey = (mickey, doorKey) => {
      doorKey.destroy();
      hasKey = true;
    };

    const escape = () => {
      if (hasKey) {
        this.scene.start("winscreen");
        hasKey = false;
      } else {
        return false;
      }
    }

    this.physics.add.collider(ghosts, mickey, processCollision, null, this);
    this.physics.add.collider(doorKey, mickey, getKey, null, this);
    this.physics.add.collider(castleDoor, mickey, null, escape, this);
    

    mickey.setBounce(1, 1);
    mickey.setCollideWorldBounds(true);
  },
  update: function () {
    const { velocity } = mickey.body;

    if (cursors.space.isDown) {
      const x = decelerate(velocity.x);
      const y = decelerate(velocity.y);
      mickey.setVelocity(x, y);
    }

    if (cursors.up.isDown) mickey.setVelocityY(accelerate(velocity.y, -1));
    if (cursors.right.isDown) mickey.setVelocityX(accelerate(velocity.x, 1));
    if (cursors.down.isDown) mickey.setVelocityY(accelerate(velocity.y, 1));
    if (cursors.left.isDown) mickey.setVelocityX(accelerate(velocity.x, -1));

    // text.setText("Timer: " + timedEvent.getProgress().toString().substr(0, 4));
  },
});
