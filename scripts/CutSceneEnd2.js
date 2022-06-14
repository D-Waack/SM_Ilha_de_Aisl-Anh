var cutSceneEnd2 = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function GamePlay() {
    Phaser.Scene.call(this, { key: 'CutsceneEnd2' });
  },
  init() {
    
  },
  create: function () {
    this.scene.stop('BeachEndScene');
    this.sound.play('knifeSound');

    this.cameras.main.setBounds(0,0, 512, 512, true);
    //this.cameras.main.setZoom(1.5);


    var panel = this.add.image(300,360,'finalFairy');
    panel.setScale(3);
    this.cameras.main.fadeOut(3000, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
		this.scene.start('CutsceneEnd3');
	});/*
    var timer = this.time.addEvent({
      delay: 1000,                // ms
      callback: function() {
        this.scene.start('CutsceneEnd3');
      },
      callbackScope: this,
      loop: false
    });*/

  },

  update: function () {
    
  },
});

myGame.scenes.push(cutSceneEnd2);