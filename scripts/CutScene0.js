var cutScene0 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function GamePlay() {
            Phaser.Scene.call(this, { key: 'CutScene0' });
        },
    init(data) {
        this.save_slot = data.save_slot;
        this.map; this.playerInstance;
        this.dialog_scene;
    },
    create: function () {
        this.sound.play('marRevolto', { loop: true });       //Settando a musica
        this.map = this.make.tilemap({ key: 'cutscene0Mapa' });  //Criar mapa
                 
        makeCollisionLayer(this.map, "tileSet1-extr", "tilesExtruded", "ground"); //Layer de colisão com paredes 
        makeCollisionLayer(this.map, "tileSet1-extr", "tilesExtruded", "walls"); //Layer de colisão com paredes

        this.playerInstance = makePlayer(this, [16,10], "up"); //Player é feito
        this.playerInstance.canMove = false; //Para o jogador não se mover durante a cutscene

        setCamera(this.cameras.main, this.playerInstance, this.map, this) //Settando a camera
        
        this.scene.launch('dialogScene', { dialogIndex: 0 }); //Diálogo inicial acontece
        this.dialog_scene = this.scene.get('dialogScene');   //cena de diálogo logada para receber evento
        this.dialog_scene.events.once('dialog_end', function () {
            this.scene.start('CutScene1', { save_slot: this.save_slot});
        }, this);
    },
});

myGame.scenes.push(cutScene0);