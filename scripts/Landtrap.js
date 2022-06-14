class Grasstrap extends Enemy {
    constructor(config) {
        super(config, 'grasstrap');
        this.current_scene = config.scene;
        this.spawnLocation = [config.x, config.y];
        this.bulletTimer = 500;
        this.bulletDistance = 500;
        this.bulletSpeed = 200;
    }

    enemySetup(scene) {
        this.bullets = new Bullets(scene, 12)
        this.setActive(false);
        this.setVisible(false);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 6, end: 11 }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true,
        });

    }

    enemyUpdate(angle) {
        if (!this.alive) {
            this.setVelocity(0, 0);
            return
        }
        this.angle = angle;
        this.bullets.children.each(function(bullet) {
            if (Phaser.Math.Distance.Between(bullet.x, bullet.y, this.x, this.y) >= this.bulletDistance)
                bullet.singleBulletKill();
        }, this);
        this.anims.play('idle', true);
    }

    enemyShoot() {
        if (this.alive) {
            this.bullets.fireBulletHorizontal(this.x, this.y, this.bulletSpeed);
            this.bullets.fireBulletHorizontal(this.x, this.y, this.bulletSpeed);
        }
    }

    enemySlashed() {
        this.bullets.bulletKill();
        this.setVelocity(0, 0);
        this.alive = false;
        this.anims.play('death', true);
    }
}

class Sandtrap extends Enemy {
    constructor(config) {
        super(config, 'sandtrap');
        this.current_scene = config.scene;
        this.spawnLocation = [config.x, config.y];
        this.bulletTimer = 2000;
        this.bulletDistance = 500;
        this.bulletSpeed = 300;
    }

    direction = "right"

    enemySetup(scene) {
        this.bullets = new Bullets(scene, 20)
        this.setActive(false);
        this.setVisible(false);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 6, end: 11 }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true,
        });
    }
    enemyUpdate(angle) {
        if (!this.alive) {
            this.setVelocity(0, 0);
            return
        }
        this.angle = angle;
        this.bullets.children.each(function(bullet) {
            if (Phaser.Math.Distance.Between(bullet.x, bullet.y, this.x, this.y) >= this.bulletDistance)
                bullet.singleBulletKill();
        }, this);
        this.anims.play('idle', true);
    }

    enemyShoot() {
        if (this.alive) {
            this.bullets.fireBulletCrossAndX(this.x, this.y, this.bulletSpeed);
            this.bullets.fireBulletCrossAndX(this.x, this.y, this.bulletSpeed);
            this.bullets.fireBulletCrossAndX(this.x, this.y, this.bulletSpeed);
            this.bullets.fireBulletCrossAndX(this.x, this.y, this.bulletSpeed);
        }
    }

    enemySlashed() {
        this.bullets.bulletKill();
        this.setVelocity(0, 0);
        this.alive = false;
        this.anims.play('death', true);
    }
}


class Mudtrap extends Enemy {
    constructor(config) {
        super(config, 'mudtrap');
        this.current_scene = config.scene;
        this.spawnLocation = [config.x, config.y];
        this.bulletTimer = 2000;
        this.bulletDistance = 500;
        this.bulletSpeed = 100;
    }

    direction = "right"

    enemySetup(scene) {
        this.bullets = new Bullets(scene, 10)
        this.setActive(false);
        this.setVisible(false);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 6, end: 11 }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true,
        });

    }
    enemyUpdate(angle) {
        if (!this.alive) {
            this.setVelocity(0, 0);
            return
        }
        this.angle = angle;
        this.bullets.children.each(function(bullet) {
            if (Phaser.Math.Distance.Between(bullet.x, bullet.y, this.x, this.y) >= this.bulletDistance)
                bullet.singleBulletKill();
        }, this);
        this.anims.play('idle', true);
    }
    enemyShoot() {
        if (this.alive) {
            this.bullets.fireBulletFollow(this.x, this.y, this.angle, this.bulletSpeed);
            this.bullets.fireBulletFollow(this.x, this.y, this.angle, this.bulletSpeed);
            this.bullets.fireBulletFollow(this.x, this.y, this.angle, this.bulletSpeed);
            this.bullets.fireBulletFollow(this.x, this.y, this.angle, this.bulletSpeed);
            this.bullets.fireBulletFollow(this.x, this.y, this.angle, this.bulletSpeed);
        }
    }

    enemySlashed() {
        this.bullets.bulletKill();
        this.setVelocity(0, 0);
        this.alive = false;
        this.anims.play('death', true);
    }
}