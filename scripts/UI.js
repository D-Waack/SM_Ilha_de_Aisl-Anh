
var UI = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
        function UI() {
            Phaser.Scene.call(this, { key: 'UI-scene' });
        },

    create() {
        this.timeLeft = 3;
        var mainscene;
        if (this.scene.isActive('forestArea')) {
          mainScene = this.scene.get('forestArea');
        }
        else if (this.scene.isActive('desertArea')) {
          mainScene = this.scene.get('desertArea');
        }
        else if (this.scene.isActive('mountainArea')) {
          mainScene = this.scene.get('mountainArea');
        }
        var powerContainer = this.add.sprite(64,48,'powerGaugeContainer');
        powerContainer.scale = 4;
        var powerGauge = this.add.sprite(64,48,'powerGauge');
        powerGauge.scale = 4;
        gaugeMask =  this.add.sprite(powerGauge.x, powerGauge.y, "powerGauge");
        gaugeMask.scale = 4;
        gaugeMask.visible = false;
        powerGauge.mask = new Phaser.Display.Masks.BitmapMask(this, gaugeMask);
        
        hearts = this.add.group();
        hearts.createMultiple({
            key: 'heartFull',
            setXY: {
                x: 16,
                y: 16,
                stepX: 32
            },
            quantity: 3,
            setScale: { x: 4, y: 4 }
        });

        mainScene.events.on('player_hit', removeHearts, this)
        mainScene.events.on('power_spent', changeMask, this)
    },
}
);

function removeHearts(current_health) {
    var heart_count = hearts.getLength()
    var x = heart_count - current_health
    var i = 0;
    hearts.children.each(function(heart) {
        i++;
        if (i>current_health){
            heart.setTexture('heartEmpty')
        }
    }, this);
}

function changeMask(powerLeft){
  //do something
  var stepWidth = gaugeMask.displayWidth/100;
  gaugeMask.x = 64 - (stepWidth * (100-powerLeft));
}

myGame.scenes.push(UI);