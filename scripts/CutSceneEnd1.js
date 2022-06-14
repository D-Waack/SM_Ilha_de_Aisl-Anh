var cutSceneEnd1 = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function GamePlay() {
    Phaser.Scene.call(this, { key: 'CutsceneEnd1' });
  },
  init() {
    this.map;
    this.boatGang;
    this.collisionLayer;
    this.panel1;
    this.panel2;
  },
  create: function () {
    this.scene.stop('BeachEndScene');
    this.sound.play('marRevolto')
    this.map = this.make.tilemap({ key: 'ending1' }); //Criar mapa
    this.collisionLayer = makeCollisionLayer(this.map, "tileSet1-extr", "tilesExtruded", "ground"); //Layer de colisão com paredes

    this.boatGang = this.add.image(50, 200, 'boatGang'); //Fazendo o barco e a animação

    setCameraFinal(this.cameras.main, this.boatGang, this.map);

    this.tweens.add({
      targets: [this.boatGang],
      y: { value: 350, duration: 15000, ease: 'Power2' },
      onComplete: function () {
        this.sound.stopAll();
        this.scene.start('MainMenu');
      },
      callbackScope: this,
      repeat: 0
    });

    this.panel1 = this.add.image(this.boatGang.x + 200, this.boatGang.y, 'end1q1');
    var timer = this.time.addEvent({
      delay: 7500,                // ms
      callback: function(panel1, panel2) {
        panel1.setVisible(false);
        panel2 = this.add.image(panel1.x, panel1.y, 'end1q2');
      },
      args: [this.panel1, this.panel2],
      callbackScope: this,
      loop: false
    });
  },

  update: function () {
    
  },
});

myGame.scenes.push(cutSceneEnd1);