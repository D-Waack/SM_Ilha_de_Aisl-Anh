var deathScreenState = new Phaser.Class({
    
    Extends: Phaser.Scene,
    initialize:
        function Preload() {
            Phaser.Scene.call(this, { key: 'DeathScreen' });
        },
    init: function() {
        this.cursors = this.input.keyboard.createCursorKeys();
    },
    create: function () {
        var screenFilter = this.add.image(0,0,'filter');
        screenFilter.setScale(6);
        this.add.text(200, 200, 'Edgar está preso em um pesadelo eterno\nPressione Espaço para tentar novamente', {fontsize: '48px', fill: '#000'});
    },
    update: function() {
        if(Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
          this.scene.stop(this);
        }
    }
});

myGame.scenes.push(deathScreenState);