var mainMenuState = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function MainMenu() {
        Phaser.Scene.call(this, { key: 'MainMenu' });
    },
    init: function() { //variáveis declaradas assim porque eu fico confuso com várias variáveis globais
        this.cursors;
        this.esc_key;
        this.startButton;
        this.menuCursor;
        this.texto;
        this.texto2;
        this.state;
        this.option;
        this.newButton;
        this.continueButton;
        this.optionsButton;
        this.save1Button;
        this.save2Button;
        this.save3Button;
        this.instructions;
    },
    create: function() {
        //Variáveis globais
        quadrantSize = 32; //Tamanho de cada tela em tiles
        tileSize = 16; //Tamanho de cada tile em pixels

        this.sound.play('mainTheme', { loop: true }); //Settando musica
        this.cursors = this.input.keyboard.createCursorKeys(); //Settando input
        this.esc_key = this.input.keyboard.addKey('ESC');
        //Isso dá erro quando executando pelo replit
/*
        if (!localStorage.getItem('player_data1')) { //Conferindo estado da save data, e criando se necessário
            var save_data1 = this.cache.json.get('player_data1');
            var save_data2 = this.cache.json.get('player_data2');
            var save_data3 = this.cache.json.get('player_data3');
            save_data1.PlayerAtual = save_data1.PlayerConstante;
            save_data2.PlayerAtual = save_data2.PlayerConstante;
            save_data3.PlayerAtual = save_data3.PlayerConstante;
            localStorage.setItem('player_data1', JSON.stringify(save_data1));
            localStorage.setItem('player_data2', JSON.stringify(save_data2));
            localStorage.setItem('player_data3', JSON.stringify(save_data3));
        }
*/
        const titleImage = this.add.image(430, 210, 'titleScreen'); //Gráfico
        titleImage.setScale(4);
        this.startButton = this.add.image(380, 300, 'startButton');
        this.menuCursor = this.add.image(280, 300, 'cursorMenu');
        this.startButton.setScale(4);
        this.menuCursor.setScale(4);
        this.texto = this.add.text(240, 100, 'A Ilha de Aisl-ahn', { fontsize: '30px', fill: '#000' });
        this.texto2 = this.add.text(230, 200, 'Pressione a barra de espaço para iniciar', { fontsize: '30px', fill: '#000' });
        this.texto.setScale(2);
        this.state = 0;
        this.option = 0;
    },
    update: function() {
        switch (this.state) {
            case 0: //tela inicial
                if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
                    this.texto2.setVisible(false);
                    this.startButton.setVisible(false);
                    this.newButton = this.add.image(380, 300, 'newButton');
                    this.continueButton = this.add.image(380, 380, 'continueButton');
                    this.optionsButton = this.add.image(380, 460, 'optionsButton');
                    this.newButton.setScale(4);
                    this.continueButton.setScale(4);
                    this.optionsButton.setScale(4);
                    this.state = 1;
                }
                break;
            case 1: //escolha de modo
                if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
                    if (this.option == 0 || this.option == 1) {
                        this.menuCursor.y += 80;
                        this.option += 1;
                    } else if (this.option == 2) {
                        this.option = 0;
                        this.menuCursor.y -= 160;
                    }
                }
                if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
                    if (this.option == 1 || this.option == 2) {
                        this.menuCursor.y -= 80;
                        this.option -= 1;
                    } else if (this.option == 0) {
                        this.option = 2;
                        this.menuCursor.y += 160;
                    }
                }
                if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
                    this.newButton.setVisible(false);
                    this.continueButton.setVisible(false);
                    this.optionsButton.setVisible(false);
                    if(this.option !=2) {
                      this.save1Button = this.add.image(380, 300, 'saveButton1');
                      this.save2Button = this.add.image(380, 380, 'saveButton2');
                      this.save3Button = this.add.image(380, 460, 'saveButton3');
                      this.save1Button.setScale(4);
                      this.save2Button.setScale(4);
                      this.save3Button.setScale(4);
                      this.menuCursor.y = 300;
                      if (this.option == 0)
                          this.state = 2;
                      else if (this.option == 1)
                          this.state = 3;
                      this.option = 0;
                    }
                    else {
                      this.instructions = this.add.image(380,300,'instructions');
                      this.instructions.setScale(4);
                      this.menuCursor.y = -300;
                      this.option = 0;
                      this.state = 4;
                    }
                }
                if (Phaser.Input.Keyboard.JustDown(this.esc_key)) {
                    this.newButton.setVisible(false);
                    this.continueButton.setVisible(false);
                    this.optionsButton.setVisible(false);
                    this.texto2.setVisible(true);
                    this.startButton.setVisible(true);
                    this.menuCursor.y = 300;
                    this.option = 0;
                    this.state = 0;
                }
                break;
            case 2: //saves no new game
                if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
                    if (this.option == 0 || this.option == 1) {
                        this.menuCursor.y += 80;
                        this.option += 1;
                    } else if (this.option == 2) {
                        this.option = 0;
                        this.menuCursor.y -= 160;
                    }
                }
                if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
                    if (this.option == 1 || this.option == 2) {
                        this.menuCursor.y -= 80;
                        this.option -= 1;
                    } else if (this.option == 0) {
                        this.option = 2;
                        this.menuCursor.y += 160;
                    }
                }
                if (Phaser.Input.Keyboard.JustDown(this.esc_key)) {
                    this.save1Button.setVisible(false);
                    this.save2Button.setVisible(false);
                    this.save3Button.setVisible(false);
                    this.newButton.setVisible(true);
                    this.continueButton.setVisible(true);
                    this.optionsButton.setVisible(true);
                    this.menuCursor.y = 300;
                    this.option = 0;
                    this.state = 1;
                }
                if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
                    save_slot = this.option;
                    this.state = 8;
                }
                break;
            case 3: //saves no continue game
                if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
                    if (this.option == 0 || this.option == 1) {
                        this.menuCursor.y += 80;
                        this.option += 1;
                    } else if (this.option == 2) {
                        this.option = 0;
                        this.menuCursor.y -= 160;
                    }
                }
                if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
                    if (this.option == 1 || this.option == 2) {
                        this.menuCursor.y -= 80;
                        this.option -= 1;
                    } else if (this.option == 0) {
                        this.option = 2;
                        this.menuCursor.y += 160;
                    }
                }
                if (Phaser.Input.Keyboard.JustDown(this.esc_key)) {
                    this.save1Button.setVisible(false);
                    this.save2Button.setVisible(false);
                    this.save3Button.setVisible(false);
                    this.newButton.setVisible(true);
                    this.continueButton.setVisible(true);
                    this.optionsButton.setVisible(true);
                    this.menuCursor.y = 300;
                    this.option = 0;
                    this.state = 1;
                }
                break;
            case 4: //tela de instruções
                if (Phaser.Input.Keyboard.JustDown(this.esc_key)) {
                    this.instructions.setVisible(false);
                    this.newButton.setVisible(true);
                    this.continueButton.setVisible(true);
                    this.optionsButton.setVisible(true);
                    this.menuCursor.y = 300;
                    this.option = 0;
                    this.state = 1;
                }
              break;
            case 8: //new game escolhido
                this.sound.stopAll();
                this.scene.start('CutScene0', { save_slot: save_slot });
                //this.scene.start('mountainArea');
                break;
            case 9: //continue game escolhido
                break;
        }
    },

});

myGame.scenes.push(mainMenuState);