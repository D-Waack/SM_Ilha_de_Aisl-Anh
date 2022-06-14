var desertArea = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function GamePlay() {
        Phaser.Scene.call(this, { key: 'desertArea' });
    },
    init(data) {
        this.progress = data.progress;
        this.map;
        this.collisionLayer;
        this.collisionLayer2;
        this.playerInstance;
        this.dialog_scene;
        this.teleportLayer;
        this.teleportArea = [];
        this.touchedTeleport = false;
        this.goalLayer;
        this.goalArea = [];
        this.touchedGoal = false;
        this.teleported;
        this.goald;
        this.enemyLayers;
        this.enemyTypes;
        this.enemyGroups;
        this.playerQuadrant;
        this.died = false;
    },
    create: function() {
        this.enemyTypes = [Grasstrap, Sandtrap, Mudtrap]; //Tipos de inimigos do mapa na ordem de criação

        this.sound.play('desertTheme', { loop: true });//Settando musica
        this.scene.launch('UI-scene'); //Lança elementos UI
        this.map = this.make.tilemap({ key: 'desertArea' }); //Criar mapa
        this.collisionLayer = makeCollisionLayer(this.map, "tileSet1-extr", "tilesExtruded", "ground"); //Layer de colisão com paredes
        this.collisionLayer2 = makeCollisionLayer(this.map, "tileSet1-extr", "tilesExtruded", "walls"); //Layer de colisão com paredes
        
        this.enemyLayers = makeEnemyLayers(this.map); //Layers com spawns dos inimigos
         //Layers de saída/fim
        this.teleportLayer = makeLayer(this.map, 'teleporter'); //Layer de teleporte na saida do mapa
        this.goalLayer = makeLayer(this.map, 'goal'); //Layer de teleporte na saida do mapa

        this.playerInstance = makePlayer(this, [125, 9], "left"); //Player é feito

        this.enemyGroups = makeEnemyGroups(this.enemyLayers, this.enemyTypes, this); //Grupos de inimigos são feitos

        this.bulletTimers = makeBulletTimers(this.enemyGroups, this); //Timers para os ataques dos inimigos

        this.physics.add.collider(this.playerInstance, this.collisionLayer); //Collider entre player e paredes
        this.physics.add.collider(this.playerInstance, this.collisionLayer2); //Collider entre player e paredes
        addCollider(this.playerInstance, this.enemyGroups, this); //Collider enetre player e inimigos e ataques

        setCamera(this.cameras.main, this.playerInstance, this.map, this) //Settando a camera
        this.playerQuadrant = findPlayerQuadrant(this.playerInstance, this.map); //Usado para fazer o scroll da tela

        this.teleportLayer.objects.forEach(function(teleport) {
            this.teleportArea = this.add.rectangle(teleport.x, teleport.y, teleport.width, teleport.height);
        }, this);
        this.goalLayer.objects.forEach(function(goal) {
            this.goalArea = this.add.rectangle(goal.x, goal.y, goal.width, goal.height);
        }, this)
    },

    update: function() {
        if (!this.touchedTeleport && !this.touchedGoal) {
            playerUpdate(this.playerInstance, this);
        }
        enemyUpdate(this.enemyGroups, this.playerInstance, this); //Update dos inimigos

        var shouldScroll = !Phaser.Geom.Rectangle.Contains(this.cameras.main.getBounds(), this.playerInstance.x, this.playerInstance.y);
        if (shouldScroll) {
            killAllEnemies(this.enemyGroups, this); //Mata todos os inimigos
            this.playerQuadrant = scrollScreen(this.cameras.main, this.playerInstance, this.enemyGroups, this.map, this.playerQuadrant, this);
        }

        this.teleported = this.physics.overlapRect(
            this.teleportArea.x, this.teleportArea.y, this.teleportArea.width, this.teleportArea.height
        );
        this.teleported.forEach(function(tel) {
            if (tel.gameObject == this.playerInstance && !this.touchedTeleport && this.playerInstance.alive) {
                this.touchedTeleport = true;
                this.tweens.add({
                    targets: [this.playerInstance],
                    x: { value: -10, duration: 300, ease: 'Power2' },
                    onComplete: function() {
                        this.sound.stopAll();
                        this.scene.start('hubScene', {startingPos: [3,10], startingDirection: "right", progress: this.progress});
                    },
                    callbackScope: this,
                    repeat: 0
                });
            }
        }, this);

        this.goald = this.physics.overlapRect(
            this.goalArea.x, this.goalArea.y, this.goalArea.width, this.goalArea.height
        );
        this.goald.forEach(function(obj){
            if (obj.gameObject == this.playerInstance && !this.touchedGoal && this.playerInstance.alive) {
                this.touchedGoal = true;
                this.playerInstance.playerStop("up");
                this.scene.launch("dialogScene", { dialogIndex: 3 });
                var dialog_scene = this.scene.get('dialogScene');
                dialog_scene.events.once('dialog_end', function() {
                    this.progress[0] = true
                    this.sound.stopAll();
                    this.scene.start('hubScene', {startingPos: [3,10], startingDirection: "right", progress: this.progress});
                }, this);
            }
        }, this);
        this.died = deathScreen(this.playerInstance, this.died, this, {startingPos: [14,10], startingDirection: "left", progress: this.progress});
    },
});

myGame.scenes.push(desertArea);