
var finalChoice = new Phaser.Class({
  // Define scene
  Extends: Phaser.Scene,
  initialize:
    function UI() {
      Phaser.Scene.call(this, { key: 'finalChoice' });
    },

  init() {
    this.choice1;
    this.choice2;
    this.text1;
    this.text2;
    this.cursor;
    this.cursors;
    this.state;
    this.sceneGate;
  },

  create() {
    this.choice1 = this.add.image(420, 220, 'nameBox');
    this.choice1.setScale(8, 3);
    this.text1 = this.add.text(320, 210, 'Vamos embora, amigos', { fontsize: '30px', fill: '#000' });
    this.choice2 = this.add.image(420, 420, 'nameBox');
    this.choice2.setScale(8, 3);
    this.text2 = this.add.text(280, 415, 'Eu tenho que cumprir uma promessa.', { fontsize: '30px', fill: '#000' });
    this.cursor = this.add.image(120, 220, 'cursorMenu');
    this.cursor.setScale(4);
    this.cursors = this.input.keyboard.createCursorKeys(); //Settando input
    this.state = 0;
    this.sceneGate = false;
  },
  update() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down) || Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      if (this.state == 0) {
        this.state = 1;
        this.cursor.y += 200;
      }
      else if (this.state == 1) {
        this.state = 0;
        this.cursor.y -= 200;
      }
    }
    else if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && !this.sceneGate) {
      this.sceneGate = true;
      this.choice1.setVisible(false);
      this.choice2.setVisible(false);
      this.text1.setVisible(false);
      this.text2.setVisible(false);
      this.cursor.setVisible(false);
      if (this.state == 0) {
        this.scene.launch("dialogScene", { dialogIndex: 6 });
        var dialog_scene = this.scene.get('dialogScene');
        dialog_scene.events.once('dialog_end', function () {
          //this.scene.start('CutsceneEnd1');
          this.events.emit('BadEnding');
        }, this);
      }
      else {
        this.scene.launch("dialogScene", { dialogIndex: 7 });
        var dialog_scene = this.scene.get('dialogScene');
        dialog_scene.events.once('dialog_end', function () {
          this.events.emit('GoodEnding');
        }, this);
      }
    }
  }
}
);

myGame.scenes.push(finalChoice);