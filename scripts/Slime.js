class Slime extends Enemy {
    constructor(config) {
        super(config, 'slimeButGreen2');
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
            key: 'idleRight',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleLeft',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 5, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkRight',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 10, end: 13 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkLeft',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 14, end: 17 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'deathRight',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 18, end: 22 }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true,
        });
        this.anims.create({
            key: 'deathLeft',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 23, end: 27 }),
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
        switch (this.direction) {
            case "right":
                this.anims.play('idleRight', true);
                break;
            case "left":
                this.anims.play('idleLeft', true);
                break;
            default:
                this.anims.play('idleRight', true);
        }
    }

    enemyShoot() {
        if (this.alive) {
            this.bullets.fireBulletCross(this.x, this.y, this.bulletSpeed);
            this.bullets.fireBulletCross(this.x, this.y, this.bulletSpeed);
            this.bullets.fireBulletCross(this.x, this.y, this.bulletSpeed);
            this.bullets.fireBulletCross(this.x, this.y, this.bulletSpeed);
        }
    }

    enemySlashed() {
        this.bullets.bulletKill();
        this.setVelocity(0, 0);
        this.alive = false;
        this.anims.play('deathRight', true);
    }
}

class RedSlime extends Enemy {
    constructor(config) {
        super(config, 'slimeButRed2');
        this.current_scene = config.scene;
        this.spawnLocation = [config.x, config.y];
        this.bulletTimer = 2000;
        this.bulletDistance = 500;
        this.bulletSpeed = 300;
    }

    direction = "right"

    enemySetup(scene) {
        this.bullets = new Bullets(scene, 5)
        this.setActive(false);
        this.setVisible(false);

        this.anims.create({
            key: 'idleRight',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleLeft',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 5, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkRight',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 10, end: 13 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkLeft',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 14, end: 17 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'deathRight',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 18, end: 22 }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true,
        });
        this.anims.create({
            key: 'deathLeft',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 23, end: 27 }),
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
        switch (this.direction) {
            case "right":
                this.anims.play('idleRight', true);
                break;
            case "left":
                this.anims.play('idleLeft', true);
                break;
            default:
                this.anims.play('idleRight', true);
        }
    }

    enemyShoot() {
        if (this.alive) {
            this.bullets.fireBulletFollow(this.x, this.y, this.angle, this.bulletSpeed);
        }
    }

    enemySlashed() {
        this.bullets.bulletKill();
        this.setVelocity(0, 0);
        this.alive = false;
        this.anims.play('deathRight', true);
    }
}


class YellowSlime extends Enemy {
    constructor(config) {
        super(config, 'slimeButYellow2');
        this.current_scene = config.scene;
        this.spawnLocation = [config.x, config.y];
        this.bulletTimer = 2000;
        this.bulletDistance = 500;
        this.bulletSpeed = 300;
    }

    direction = "right"

    enemySetup(scene) {
        this.bullets = new Bullets(scene, 5)
        this.setActive(false);
        this.setVisible(false);

        this.anims.create({
            key: 'idleRight',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleLeft',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 5, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkRight',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 10, end: 13 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkLeft',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 14, end: 17 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'deathRight',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 18, end: 22 }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true,
        });
        this.anims.create({
            key: 'deathLeft',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 23, end: 27 }),
            frameRate: 10,
            repeat: -1,
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
        switch (this.direction) {
            case "right":
                this.anims.play('idleRight', true);
                break;
            case "left":
                this.anims.play('idleLeft', true);
                break;
            default:
                this.anims.play('idleRight', true);
        }
    }
    enemyShoot() {
        if (this.alive) {
            this.bullets.fireBulletCross(this.x, this.y, this.bulletSpeed);
            //this.bullets.fireBulletYellowSlime(this.x, this.y, this.angle, this.bulletSpeed);
        }
    }

    enemySlashed() {
        this.bullets.bulletKill();
        this.setVelocity(0, 0);
        this.alive = false;
        this.anims.play('deathRight', true);
    }
}