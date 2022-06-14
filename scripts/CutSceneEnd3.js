var cutSceneEnd3 = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function GamePlay() {
    Phaser.Scene.call(this, { key: 'CutsceneEnd3' });
  },
  init() {
    this.counter;
    this.inFade;
    this.inFade2;
  },
  create: function () {

    this.cameras.main.setBounds(0, 0, 512, 512, true);
    this.counter = 0;
    //this.cameras.main.setZoom(1.5);
    this.cameras.main.fadeIn(3000, 0, 0, 0);
    var panel = this.add.image(472, 160, 'endTrue');
    panel.setScale(3);
    var panel2; var panel3; var panel4; var panel5;
    this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) => {
      var time = 8000;
      this.cameras.main.fadeOut(time, 0, 0, 0);
    });
    this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
      switch (this.counter) {
        case 0:
          panel.setVisible(false);
          panel2 = this.add.image(412, 280, 'end2q3');
          this.counter++;
          break;
        case 1:
          panel2.setVisible(false);
          panel3 = this.add.image(412,280,'end2q4');
          this.counter++;
          break;
        case 2: 
          panel3.setVisible(false);
          panel4 = this.add.image(412,280,'end2q5');
          this.counter++;
          break;
        case 3: 
          panel4.setVisible(false);
          panel5 = this.add.image(412,280,'end2q6');
          this.counter++;
          break;
        case 4: 
          panel5.setVisible(false);
          panel6 = this.add.image(412,280,'end2q7');
          this.counter++;
          break;
        case 5: 
          panel6.setVisible(false);
          panel7 = this.add.image(412,280,'end2q8');
          this.counter++;
          break;
        case 6:
          this.sound.stopAll();
          this.sound.play('gaivotas');
          this.scene.start('MainMenu');
      }
      this.cameras.main.fadeIn(3000,0,0,0)
    });

    /*
        
        var panel = this.add.image(472, 160, 'endTrue');
        panel.setScale(3);
        this.cameras.main.fadeIn(3000, 0, 0, 0);
        this.cameras.main.fadeOut(3000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
          panel.setVisible(false);
          var panel2 = this.add.image(472, 360, 'end2q3');
          this.cameras.main.fadeIn(3000, 0, 0, 0);
        });
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

myGame.scenes.push(cutSceneEnd3);