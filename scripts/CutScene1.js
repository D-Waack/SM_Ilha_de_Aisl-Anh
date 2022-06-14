var cutScene1 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function GamePlay() {
        Phaser.Scene.call(this, { key: 'CutScene1' });
    },
    init(data) {
        this.save_slot = data.save_slot;
        this.map;
        this.collisionLayer;
        this.playerInstance;
        this.dialog_scene;
        this.teleportLayer;
        this.collisionLayer2;
        this.teleportArea = [];
        this.boat;
        this.endY = 23 * tileSize;
        this.touchedTeleport = false;
        this.teleported;
    },
    create: function() {
        this.map = this.make.tilemap({ key: 'cutscene1Mapa' }); //Criar mapa

        this.collisionLayer = makeCollisionLayer(this.map, "tileSet1-extr", "tilesExtruded", "ground"); //Layer de colisão com paredes
        this.collisionLayer2 = makeCollisionLayer(this.map, "tileSet1-extr", "tilesExtruded", "walls"); //Layer de colisão com paredes
        
        this.teleportLayer = makeLayer(this.map, 'teleporter'); //Layer de teleporte no fim do mapa
        this.teleportLayer.objects.forEach(function(teleport) {
            this.teleportArea = this.add.rectangle(teleport.x, teleport.y, teleport.width, teleport.height);
        }, this);

        this.playerInstance = makePlayer(this, [15, 30], "up"); //Player é feito
        this.physics.add.collider(this.playerInstance, this.collisionLayer); //Collider entre player e paredes
        this.physics.add.collider(this.playerInstance, this.collisionLayer2); //Collider entre player e paredes

        setCamera(this.cameras.main, this.playerInstance, this.map, this) //Settando a camera

        this.boat = this.add.image(this.playerInstance.x, this.playerInstance.y, 'rowboat'); //Fazendo o barco e a animação
        this.playerInstance.canMove = false; //Player não pode se mover durante a animação
        this.tweens.add({
            targets: [this.playerInstance, this.boat],
            y: { value: this.endY, duration: 3000, ease: 'Power2' },
            onComplete: function() {
                this.scene.launch("dialogScene", { dialogIndex: 1 });
                var dialog_scene = this.scene.get('dialogScene');
                dialog_scene.events.once('dialog_end', function() {
                    this.playerInstance.canMove = true;
                }, this);
            },
            callbackScope: this,
            repeat: 0
        });
    },

    update: function() {
        if (!this.touchedTeleport) {
            playerUpdate(this.playerInstance, this);
        }
        this.teleported = this.physics.overlapRect(
            this.teleportArea.x, this.teleportArea.y, this.teleportArea.width, this.teleportArea.height
        );
        this.teleported.forEach(function(tel) {
            if (tel.gameObject == this.playerInstance && !this.touchedTeleport) {
                this.touchedTeleport = true;
                this.sound.stopAll();
                this.sound.play('gaivotas');
                this.tweens.add({
                    targets: [this.playerInstance],
                    y: { value: -10, duration: 300, ease: 'Power2' },
                    onComplete: function() {
                        this.scene.start('hubScene', {startingPos: [16,30], startingDirection: "up", progress: [false,false,false,false]});
                    },
                    callbackScope: this,
                    repeat: 0
                });
            }
        }, this);
    },
});

myGame.scenes.push(cutScene1);