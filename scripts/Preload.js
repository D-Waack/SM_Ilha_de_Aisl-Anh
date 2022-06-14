var preloadState = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize: function Preload() {
        Phaser.Scene.call(this, { key: 'Preload' });
    },

    preload: function() {
        //JSONS
        this.load.json('player_data1', 'assets/saves/player01.json');
        this.load.json('player_data2', 'assets/saves/player02.json');
        this.load.json('player_data3', 'assets/saves/player03.json');
        this.load.json('commonEvents', 'scripts/CommonEvents.json');
        //IMAGENS
        this.load.image('heartFull', 'assets/images/heartFull.png');
        this.load.image('heartEmpty', 'assets/images/heartEmpty.png');
        this.load.image('bullet', 'assets/images/bulletTry0.png');
        this.load.image('powerGauge', 'assets/images/TimeBar.png');
        this.load.image('titleScreen', 'assets/images/titleScreenProvisoria.png');
        this.load.image('edgarFace', 'assets/images/EdgarFaceSprite.png');
        this.load.image('tokeiFace', 'assets/images/TokeiFaceSprite.png');
        this.load.image('camilleFace', 'assets/images/CamilleFaceSprite.png');
        this.load.image('williamFace', 'assets/images/WilliamFaceSprite.png');
        this.load.image('lenoreFace', 'assets/images/LenoreFaceSprite.png');
        this.load.image('augustoFace', 'assets/images/AugustoFaceSprite.png');
        this.load.image('cristopherFace', 'assets/images/CristopherFaceSprite.png');
        this.load.image('drRowenFace', 'assets/images/drRowenFaceSprite.png');
        this.load.image('madelineFace', 'assets/images/MadelineFaceSprite.png');
        this.load.image('powerGaugeContainer', 'assets/images/containerForTimeThing.png');
        this.load.image('rowboat', 'assets/images/rowboat.png');
        this.load.image('filter', 'assets/images/filter.png');
        this.load.image('tokei', 'assets/images/Tokei.png');
        //FINAIS
        this.load.image('boatGang', 'assets/images/boatGang.png');
        this.load.image('end1q1', 'assets/images/endingQuadro.png');
        this.load.image('end1q2', 'assets/images/endingQuadro2.png');
        this.load.image('end2q3', 'assets/images/endingQuadro3.png');
        this.load.image('end2q4', 'assets/images/endingQuadro4.png');
        this.load.image('end2q5', 'assets/images/endingQuadro5.png');
        this.load.image('end2q6', 'assets/images/endingQuadro6.png');
        this.load.image('end2q7', 'assets/images/endingQuadro7.png');
        this.load.image('end2q8', 'assets/images/endingQuadro8.png');
        this.load.image('finalFairy', 'assets/images/finalBossScene.png');
        this.load.image('endTrue', 'assets/images/EndingSequenceTrue.png');
        //botoes
        this.load.image('startButton', 'assets/images/startButton.png');
        this.load.image('newButton', 'assets/images/newGameButton.png');
        this.load.image('continueButton', 'assets/images/continueGameButton.png');
        this.load.image('optionsButton', 'assets/images/optionsButton.png');
        this.load.image('saveButton1', 'assets/images/save1.png');
        this.load.image('saveButton2', 'assets/images/save2.png');
        this.load.image('saveButton3', 'assets/images/save3.png');
        this.load.image('cursorMenu', 'assets/images/knifer.png');
        this.load.image('instructions', 'assets/images/instructions.png');
        //dialogo
        this.load.image('dialogBox', 'assets/images/dialogBox.png');
        this.load.image('nameBox', 'assets/images/nameBox.png');
        //TILESETS
        this.load.image('maybesheet', 'assets/sheets/spriteSheet.png');
        this.load.image('spriteNew', 'assets/sheets/spriteSheet2.png');
        this.load.image('tilesExtruded', 'assets/sheets/tileSet0-extr.png');
        //ANIMATIONS
        this.load.image('saveEffect', 'assets/animations/saveEffect.png');
        //MAPAS
        this.load.tilemapTiledJSON('cutscene0Mapa', 'assets/maps/goodBoat2.json');
        this.load.tilemapTiledJSON('cutscene1Mapa', 'assets/maps/cutscene_mapa_1-2.json');
        this.load.tilemapTiledJSON('hubMapa', 'assets/maps/HubMap4.json');
        this.load.tilemapTiledJSON('forestArea', 'assets/maps/forestArea3.json');
        this.load.tilemapTiledJSON('desertArea', 'assets/maps/desertArea2.json');
        this.load.tilemapTiledJSON('mountainArea', 'assets/maps/mountainArea.json');
        this.load.tilemapTiledJSON('beachArea', 'assets/maps/BeachEnding.json');
        this.load.tilemapTiledJSON('ending1', 'assets/maps/ending1.json');
        //SPRITES
        this.load.spritesheet('edgar5', 'assets/sprites/tryingToAnimateEdgar5.png', { frameWidth: 16, frameHeight: 24 });
        this.load.spritesheet('knife', 'assets/sprites/knifu.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('slimeButRed', 'assets/sprites/redSlimeAnimated.png', { frameWidth: 22, frameHeight: 18 });
        this.load.spritesheet('slimeButRed2', 'assets/sprites/redSlimeWithSlash.png', { frameWidth: 22, frameHeight: 18 });
        this.load.spritesheet('slimeButGreen', 'assets/sprites/greenSlimeAnimated.png', { frameWidth: 22, frameHeight: 18 });
        this.load.spritesheet('slimeButGreen2', 'assets/sprites/greenSlimeWithSlash.png', { frameWidth: 22, frameHeight: 18 });
        this.load.spritesheet('slimeButYellow', 'assets/sprites/yellowSlimeAnimated.png', { frameWidth: 22, frameHeight: 18 });
        this.load.spritesheet('slimeButYellow2', 'assets/sprites/yellowSlimeWithSlash.png', { frameWidth: 22, frameHeight: 18 });
        this.load.spritesheet('grasstrap', 'assets/sprites/grassTrap.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('sandtrap', 'assets/sprites/sandTrap.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('mudtrap', 'assets/sprites/mudTrap.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('catYellow', 'assets/sprites/spriteCatSoulAnimated.png', { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('catBlue', 'assets/sprites/spriteCatSoulAnimatedBlue.png', { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('catPurple', 'assets/sprites/spriteCatSoulAnimatedPurple.png', { frameWidth: 16, frameHeight: 32 });
        //AUDIO
        this.load.audio('marRevolto', 'assets/sounds/MarRevolto.mp3');
        this.load.audio('gaivotas', 'assets/sounds/seagullsCry.mp3');
        this.load.audio('mainTheme', 'assets/sounds/temaDaIlha.mp3');
        this.load.audio('forestTheme', 'assets/sounds/temadafloresta.mp3');
        this.load.audio('desertTheme', 'assets/sounds/temadodeserto.mp3');
        this.load.audio('mountainTheme', 'assets/sounds/temadamontanha.mp3');
        this.load.audio('knifeSound', 'assets/sounds/knifeSound.mp3');

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        this.load.on('progress', function(value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });

        this.load.on('fileprogress', function(file) {
            assetText.setText('Loading asset: ' + file.src);
        });

        this.load.on('complete', function() {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
    },

    create: function() {
        game.scene.start('MainMenu');
    },
});

myGame.scenes.push(preloadState);