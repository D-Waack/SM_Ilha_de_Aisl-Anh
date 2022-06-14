class Enemy extends Entity {

    current_scene
    bullets 
    spawnLocation
    bulletTime
    angle = 0;
    alive = false
    

    constructor(config, texture) {
        super(config, texture)
        this.current_scene = config.scene
        this.spawnLocation = [config.x, config.y]
    }

    enemySetup(scene) {
        this.bullets = new Bullets(scene)
        this.setActive(false);
        this.setVisible(false);
    }

    enemyUpdate(angle) {
        if (this.active) {
            this.bullets.fireBullet(this.x, this.y, angle);
        }
    }

    enemyShoot() {
        if (this.active) {
            this.bullets.fireBullet(this.x, this.y, this.angle);
        }
    }

    hitDetection(direction) {
        this.setVelocity(direction.x, direction.y);   
    }

    enemyReset(spawn) {
        this.setActive(true);
        this.setVisible(true);
        this.x = spawn[0];
        this.y = spawn[1];
        this.alive = true;
    }

    enemyKill() {
        this.bullets.bulletKill();
        this.alive = false;
        this.setVelocity(0,0);
        this.setActive(false);
        this.setVisible(false);
    }
}