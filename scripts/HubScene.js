var hubScene = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize: function GamePlay() {
        Phaser.Scene.call(this, { key: 'hubScene' });
    },
    init: function(data) {
        this.startingPos = data.startingPos
        this.startingDirection = data.startingDirection
        this.progress = data.progress
        this.map;
        this.collisionLayer;
        this.collisionLayer2;
        this.playerInstance;
        this.dialog_scene;
        this.saveLayer;
        this.teleportLayer;
        this.saveArea = [];
        this.teleportAreaDown = [];
        this.teleportAreaLeft = [];
        this.teleportAreaRight = [];
        this.teleportAreaUp = [];
        this.saved;
        this.teleportedRight;
        this.teleportedLeft;
        this.teleportedUp;
        this.teleportedDown;
        this.touchedTeleport = false;
    },
    create: function() {
        //Para teste do final do jogo
        //this.progress = [true, true, true, false]

        this.scene.stop('UI-scene')
        
        this.map = this.make.tilemap({ key: 'hubMapa' }); //Criar mapa
        
        this.collisionLayer = makeCollisionLayer(this.map, "tileSet1-extr", "tilesExtruded", "ground"); //Layer de colisão com paredes
        this.collisionLayer2 = makeCollisionLayer(this.map, "tileSet1-extr", "tilesExtruded", "walls"); //Layer de colisão com paredes

        this.teleportLayer = makeLayer(this.map, 'teleportDown'); //Layer de teleporte no fim do mapa
        this.teleportLayer.objects.forEach(function(teleport) {
            this.teleportAreaDown = this.add.rectangle(teleport.x, teleport.y, teleport.width, teleport.height);
        }, this);
        this.teleportLayer = makeLayer(this.map, 'teleportRight'); //Layer de teleporte no fim do mapa
        this.teleportLayer.objects.forEach(function(teleport) {
            this.teleportAreaRight = this.add.rectangle(teleport.x, teleport.y, teleport.width, teleport.height);
        }, this);
        this.teleportLayer = makeLayer(this.map, 'teleportLeft'); //Layer de teleporte no fim do mapa
        this.teleportLayer.objects.forEach(function(teleport) {
            this.teleportAreaLeft = this.add.rectangle(teleport.x, teleport.y, teleport.width, teleport.height);
        }, this);
        this.teleportLayer = makeLayer(this.map, 'teleportUp'); //Layer de teleporte no fim do mapa
        this.teleportLayer.objects.forEach(function(teleport) {
            this.teleportAreaUp = this.add.rectangle(teleport.x, teleport.y, teleport.width, teleport.height);
        }, this);
        this.saveLayer = makeLayer(this.map, 'save'); //area de save
        this.saveLayer.objects.forEach(function(save) {
            this.saveArea = this.add.rectangle(save.x, save.y, save.width, save.height);
        }, this);

        this.playerInstance = makePlayer(this, this.startingPos, this.startingDirection);//[15, 30], "up"); //Player é feito
        this.physics.add.collider(this.playerInstance, this.collisionLayer); //Collider entre player e paredes
        this.physics.add.collider(this.playerInstance, this.collisionLayer2); //Collider entre player e paredes

        setCamera(this.cameras.main, this.playerInstance, this.map, this) //Settando a camera
        findPlayerQuadrant(this.playerInstance, this.map); //Usado para fazer o scroll da tela
    },
    update: function() {
        playerUpdate(this.playerInstance, this); //Update do player
        this.saved = this.physics.overlapRect(
            this.saveArea.x, this.saveArea.y, this.saveArea.width, this.saveArea.height
        );
        this.teleportedRight = this.physics.overlapRect(
            this.teleportAreaRight.x, this.teleportAreaRight.y, this.teleportAreaRight.width, this.teleportAreaRight.height
        );
        this.teleportedDown = this.physics.overlapRect(
            this.teleportAreaDown.x, this.teleportAreaDown.y, this.teleportAreaDown.width, this.teleportAreaDown.height
        );
        this.teleportedUp = this.physics.overlapRect(
            this.teleportAreaUp.x, this.teleportAreaUp.y, this.teleportAreaUp.width, this.teleportAreaUp.height
        );
        this.teleportedLeft = this.physics.overlapRect(
            this.teleportAreaLeft.x, this.teleportAreaLeft.y, this.teleportAreaLeft.width, this.teleportAreaLeft.height
        );
        this.saved.forEach(function(save) {
            if (save.gameObject == this.playerInstance) {
                //TODO save the game
                
                this.touchedTeleport = false;
            }
        }, this);
        this.teleportedRight.forEach(function(tel) {
            if (tel.gameObject == this.playerInstance && !this.touchedTeleport) {
                this.touchedTeleport = true;
                if(!this.progress[2]) {
                  this.tweens.add({
                      targets: [this.playerInstance],
                      x: { value: 522, duration: 300, ease: 'Power2' },
                      onComplete: function() {
                          this.scene.start('forestArea', {progress: this.progress});
                      },
                      callbackScope: this,
                      repeat: 0
                  });
                }
                else {
                  this.playerInstance.canMove = false;
                  this.playerInstance.playerStop("left");
                  this.tweens.add({
                      targets: [this.playerInstance],
                      x: { value: 470, duration: 300, ease: 'Power2' },
                      onComplete: function() {
                          this.touchedTeleport = false;
                          this.scene.launch("dialogScene", { dialogIndex: 20 });
                          var dialog_scene = this.scene.get('dialogScene');
                          dialog_scene.events.once('dialog_end', function() {
                            this.playerInstance.canMove = true;
                          }, this);
                      },
                      callbackScope: this,
                      repeat: 0
                  });
                }
            }
        }, this);
        this.teleportedDown.forEach(function(tel) {
            if (tel.gameObject == this.playerInstance && !this.touchedTeleport) {
                this.touchedTeleport = true;
                if(!this.progress[0] || !this.progress[1] || !this.progress[2]) {
                  this.playerInstance.canMove = false;
                  this.playerInstance.playerStop("up");
                  this.tweens.add({
                      targets: [this.playerInstance],
                      y: { value: 480, duration: 300, ease: 'Power2' },
                      onComplete: function() {
                        this.touchedTeleport = false;
                        this.scene.launch("dialogScene", { dialogIndex: 21 });
                        var dialog_scene = this.scene.get('dialogScene');
                        dialog_scene.events.once('dialog_end', function() {
                            this.playerInstance.canMove = true;
                        }, this);
                      },
                      callbackScope: this,
                      repeat: 0
                  });                  
                }
                else {
                    this.tweens.add({
                      targets: [this.playerInstance],
                      y: { value: 540, duration: 300, ease: 'Power2' },
                      onComplete: function() {
                          this.scene.start('BeachEndScene', {progress: this.progress});
                      },
                      callbackScope: this,
                      repeat: 0
                  });
                }
            }
        }, this);
        this.teleportedUp.forEach(function(tel) {
            if (tel.gameObject == this.playerInstance && !this.touchedTeleport) {
                this.touchedTeleport = true;
                if(!this.progress[1]) {
                  this.tweens.add({
                      targets: [this.playerInstance],
                      y: { value: -10, duration: 300, ease: 'Power2' },
                      onComplete: function() {
                          this.scene.start('mountainArea', {progress: this.progress});
                      },
                      callbackScope: this,
                      repeat: 0
                  });
                }
                else {
                  this.playerInstance.canMove = false;
                  this.playerInstance.playerStop("down");
                  this.tweens.add({
                      targets: [this.playerInstance],
                      y: { value: 40, duration: 300, ease: 'Power2' },
                      onComplete: function() {
                          this.touchedTeleport = false;
                          this.scene.launch("dialogScene", { dialogIndex: 23 });
                          var dialog_scene = this.scene.get('dialogScene');
                          dialog_scene.events.once('dialog_end', function() {
                            this.playerInstance.canMove = true;
                          }, this);
                      },
                      callbackScope: this,
                      repeat: 0
                  });
                }
            }
        }, this);
        this.teleportedLeft.forEach(function(tel) {
            if (tel.gameObject == this.playerInstance && !this.touchedTeleport) {
                this.touchedTeleport = true;
                if(!this.progress[0]) {
                  this.tweens.add({
                      targets: [this.playerInstance],
                      x: { value: -10, duration: 300, ease: 'Power2' },
                      onComplete: function() {
                          this.scene.start('desertArea', {progress: this.progress});
                      },
                      callbackScope: this,
                      repeat: 0
                  });
                }
                else {
                  this.playerInstance.canMove = false;
                  this.playerInstance.playerStop("right");
                  this.tweens.add({
                      targets: [this.playerInstance],
                      x: { value: 30, duration: 300, ease: 'Power2' },
                      onComplete: function() {
                          this.touchedTeleport = false;
                          this.scene.launch("dialogScene", { dialogIndex: 22 });
                          var dialog_scene = this.scene.get('dialogScene');
                          dialog_scene.events.once('dialog_end', function() {
                            this.playerInstance.canMove = true;
                          }, this);
                      },
                      callbackScope: this,
                      repeat: 0
                  });
                }
            }
        }, this);
    },
});

myGame.scenes.push(hubScene);