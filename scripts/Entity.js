class Entity extends Phaser.Physics.Arcade.Sprite {

    constructor(config, texture){
        super(config.scene, config.x, config.y, texture)
        config.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setImmovable();
        this.spriteName = texture;
    }
}