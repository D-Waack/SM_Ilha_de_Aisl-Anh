var beachEndScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function GamePlay() {
    Phaser.Scene.call(this, { key: 'BeachEndScene' });
  },
  init(data) {
    this.progress = data.progress;
    this.map;
    this.collisionLayer;
    this.playerInstance;
    this.dialog_scene;
    this.teleportLayer;
    this.cutsceneLayer;
    this.collisionLayer2;
    this.teleportArea = [];
    this.cutsceneArea = [];
    this.boat;
    this.tokei;
    this.touchedTeleport = false;
    this.teleported;
    this.cutscened;
  },
  create: function () {
    this.map = this.make.tilemap({ key: 'beachArea' }); //Criar mapa
    this.sound.play('mainTheme', { loop: true });

    this.collisionLayer = makeCollisionLayer(this.map, "tileSet1-extr", "tilesExtruded", "ground"); //Layer de colisão com paredes
    this.collisionLayer2 = makeCollisionLayer(this.map, "tileSet1-extr", "tilesExtruded", "walls"); //Layer de colisão com paredes

    this.teleportLayer = makeLayer(this.map, 'teleporter'); //Layer de teleporte no fim do mapa
    this.teleportLayer.objects.forEach(function (teleport) {
      this.teleportArea = this.add.rectangle(teleport.x, teleport.y, teleport.width, teleport.height);
    }, this);
    this.cutsceneLayer = makeLayer(this.map, 'cutscene');
    this.cutsceneLayer.objects.forEach(function (cutscene) {
      this.cutsceneArea = this.add.rectangle(cutscene.x, cutscene.y, cutscene.width, cutscene.height);
    }, this);

    this.playerInstance = makePlayer(this, [16, 2], "down"); //Player é feito
    this.physics.add.collider(this.playerInstance, this.collisionLayer); //Collider entre player e paredes
    this.physics.add.collider(this.playerInstance, this.collisionLayer2); //Collider entre player e paredes

    setCamera(this.cameras.main, this.playerInstance, this.map, this) //Settando a camera

    this.boat = this.add.image(194, 420, 'rowboat'); //Fazendo o barco
    this.tokei = this.add.image(306, 372, 'tokei'); //Fazendo o barco

  },

  update: function () {
    if (!this.touchedTeleport) {
      playerUpdate(this.playerInstance, this);
    }
    this.teleported = this.physics.overlapRect(
      this.teleportArea.x, this.teleportArea.y, this.teleportArea.width, this.teleportArea.height
    );
    this.cutscened = this.physics.overlapRect(
      this.cutsceneArea.x, this.cutsceneArea.y, this.cutsceneArea.width, this.cutsceneArea.height
    );
    this.teleported.forEach(function (tel) {
      if (tel.gameObject == this.playerInstance && !this.touchedTeleport) {
        this.playerInstance.playerStop("down");
        this.touchedTeleport = true;
        this.playerInstance.canMove = false;
        this.tweens.add({
          targets: [this.playerInstance],
          y: { value: 40, duration: 300, ease: 'Power2' },
          onComplete: function () {
            this.touchedTeleport = false;
            this.scene.launch("dialogScene", { dialogIndex: 24 });
            var dialog_scene = this.scene.get('dialogScene');
            dialog_scene.events.once('dialog_end', function () {
              this.playerInstance.canMove = true;
            }, this);
          },
          callbackScope: this,
          repeat: 0
        });
      }
    }, this);
    this.cutscened.forEach(function (cut) {
      if (cut.gameObject == this.playerInstance && !this.touchedTeleport) {
        this.playerInstance.playerStop("down");
        this.touchedTeleport = true;
        this.playerInstance.canMove = false;
        this.scene.launch("dialogScene", { dialogIndex: 5 });
        var dialog_scene = this.scene.get('dialogScene');
        dialog_scene.events.once('dialog_end', function () {
          this.scene.launch('finalChoice');
          var final_choice_scene = this.scene.get('finalChoice');
          final_choice_scene.events.once('BadEnding', function() {
            this.sound.stopAll();
            this.scene.start('CutsceneEnd1');
          }, this);
          final_choice_scene.events.once('GoodEnding', function() {
            this.scene.start('CutsceneEnd2');
          }, this);
        }, this);
        /*
        this.tweens.add({
          targets: [this.playerInstance],
          y: { value: 40, duration: 300, ease: 'Power2' },
          onComplete: function () {
            this.touchedTeleport = false;
            this.scene.launch("dialogScene", { dialogIndex: 5 });
            var dialog_scene = this.scene.get('dialogScene');
            dialog_scene.events.once('dialog_end', function () {
               this.scene.launch('finalChoice');
            }, this);
          },
          callbackScope: this,
          repeat: 0
        });*/
      }
    }, this);
  },
});

myGame.scenes.push(beachEndScene);