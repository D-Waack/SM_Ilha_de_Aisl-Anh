var dialog = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize: function UI() {
        Phaser.Scene.call(this, { key: 'dialogScene' });
    },

    init(data) {
        this.dialogIndex = data.dialogIndex;
        this.cursors;
        this.face0; this.face1; this.face2; this.face3; this.face4; this.face5; this.face6;
        this.face7; this.face8;
    },

    create() {
        var dialogBox = this.add.image(420, 480, 'dialogBox');
        var nameBox = this.add.image(380, 410, 'nameBox');
        this.cursors = this.input.keyboard.createCursorKeys(); 
        dialogBox.setScale(4);
        nameBox.setScale(3);
        index = this.dialogIndex.toString();
        progress = 0;
        textSource = this.cache.json.get('commonEvents');
        dialogo = this.add.text(320, 440, textSource[index]['0'].Text, { fontsize: '30px', fill: '#000' });
        nomeDialogo = this.add.text(320, 400, textSource[index]['0'].Character, { fontsize: '30px', fill: '#000' });
        this.face0 = this.add.image(230, 480, 'edgarFace');
        this.face1 = this.add.image(230, 480, 'tokeiFace');
        this.face2 = this.add.image(230, 480, 'camilleFace');
        this.face3 = this.add.image(230, 480, 'williamFace');
        this.face4 = this.add.image(230, 480, 'lenoreFace');
        this.face5 = this.add.image(230, 480, 'augustoFace');
        this.face6 = this.add.image(230, 480, 'cristopherFace');
        this.face7 = this.add.image(230,480, 'drRowenFace');
        this.face8 = this.add.image(230, 480, 'madelineFace');
        
        this.face0.setScale(4);
        this.face1.setScale(4);
        this.face2.setScale(4);
        this.face3.setScale(4);
        this.face4.setScale(4);
        this.face5.setScale(4);
        this.face6.setScale(4);
        this.face7.setScale(4);
        this.face8.setScale(4);
        
    },

    update() {
        this.face0.setVisible(false);
        this.face1.setVisible(false);
        this.face2.setVisible(false);
        this.face3.setVisible(false);
        this.face4.setVisible(false);
        this.face5.setVisible(false);
        this.face6.setVisible(false);
        this.face7.setVisible(false);
        this.face8.setVisible(false);
        
        progressString = progress.toString();
        
        switch (textSource[index][progressString].Character) {
          case "Edgar":
            this.face0.setVisible(true);
            break;
          case "Tokei":
            this.face1.setVisible(true);
            break;
          case "Camille":
            this.face2.setVisible(true);
            break;
          case "William":
            this.face3.setVisible(true);
            break;
          case "Lenore":
            this.face4.setVisible(true);
            break;
          case "Augusto":
            this.face5.setVisible(true);
            break;
          case "Cristopher":
            this.face6.setVisible(true);
            break;
          case "Dr Rowen":
            this.face7.setVisible(true);
            break;
          case "Madeline":
            this.face8.setVisible(true);
            break;
        }
        /*
        if (textSource[index][progressString].Character == "Edgar")
            var face = this.add.image(230, 480, 'edgarFace');
        else if (textSource[index][progressString].Character == "Tokei")
            var face = this.add.image(230, 480, 'tokeiFace');
        else if (textSource[index][progressString].Character == "Camille")
            var face = this.add.image(230, 480, 'camilleFace');
        else if (textSource[index][progressString].Character == "William")
            var face = this.add.image(230, 480, 'williamFace');
        else if (textSource[index][progressString].Character == "Lenore")
            var face = this.add.image(230, 480, 'lenoreFace');
        */
        //face.setScale(4);
        dialogo.setText(textSource[index][progressString].Text);
        nomeDialogo.setText(textSource[index][progressString].Character);
        nomeDialogo.setScale(1.4);
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            progress++;
        }
        if (!textSource[index][progress.toString()]) {
            this.events.emit('dialog_end');
            this.events.off('dialog_end');
            this.scene.stop(this);
        }
    }
});

myGame.scenes.push(dialog);