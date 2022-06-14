class Player extends Entity {

    constructor(config, healthPoints) {
        super(config, 'edgar5');
        this.knife = new PlayerKnife(config);
        this.depth = 5;
        this.healthPoints = healthPoints;
        this.dashTime = 2000;
        this.container = config.scene.add.container(config.x, config.y)
        //new Phaser.GameObjects.Container(config.scene, this.x, this.y, this.knife);
    }
    alive = true
    direction = ""
    canMove = true
    knife
    healthPoints
    invincible
    canDash = true
    inDash = false
    timerRunning = false
    slowDown = false
    powerLeft 

    playerSetup() {
        this.setScale(1);
        this.playerAnimate();
        this.container.active = true;
        this.container.visible = true;
        this.powerLeft = 100
    }

    movementUpdate(cursors, dashKey, slowKey) {
        if (!this.canMove)
            return
        this.direction = this.checkDirection(cursors);
        this.moveState(this.direction, cursors);
        if (Phaser.Input.Keyboard.JustDown(dashKey)) {
            this.dashState();
        }
        if(slowKey.isDown){
            this.slowDown = true;
        }
        else {
            this.slowDown = false;
        }
    }

    hitDetection(damage, direction) {
        var health = this.healthPoints - damage;
        if(!this.invincible && !this.inDash) {
          this.healthPoints = health;
          if (this.healthPoints > 0) {
              this.setVelocity(direction.x, direction.y);
          }
          else {
              //player is dead
              this.alive = false
          }
        }
    }

    checkDirection(cursors) {
        if (this.direction == "") {
            if (cursors.left.isDown) {
                this.direction = "left";
                return this.direction;
            }
            else if (cursors.right.isDown) {
                this.direction = "right";
                return this.direction;
            }
            else if (cursors.up.isDown) {
                this.direction = "up";
                return this.direction;
            }
            else if (cursors.down.isDown) {
                this.direction = "down";
                return this.direction
            }
        }
        return this.direction
    }

    moveState(direction, cursors) {
        if(this.inDash)
            return;
        switch (direction) {
            case "left":
                if (cursors.left.isDown) {
                    if(!this.invincible)
                      this.anims.play('left', true);
                    else 
                      this.anims.play('leftHurt', true);
                    if (cursors.up.isDown) {
                        this.calculateVelocity("left", "up");
                    }
                    else if (cursors.down.isDown) {
                        this.calculateVelocity("left", "down");
                    }
                    else
                        this.calculateVelocity("left", "");
                }
                else {
                    this.calculateVelocity("", "");
                    if(!this.invincible) 
                      this.anims.play('idleLeft', true);
                    else
                      this.anims.play('idleLeftHurt', true);
                    this.idleState(cursors);
                }
                break;
            case "right":
                if (cursors.right.isDown) {
                    if(!this.invincible)
                      this.anims.play('right', true);
                    else
                      this.anims.play('rightHurt', true);
                    if (cursors.up.isDown) {
                        this.calculateVelocity("right", "up");
                    }
                    else if (cursors.down.isDown) {
                        this.calculateVelocity("right", "down");
                    }
                    else
                        this.calculateVelocity("right", "");
                }
                else {
                    this.calculateVelocity("", "");
                    if(!this.invincible)
                      this.anims.play('idleRight', true);
                    else
                      this.anims.play('idleRightHurt', true);
                    this.idleState(cursors);
                }
                break;
            case "up":
                if (cursors.up.isDown) {
                    if(!this.invincible)
                      this.anims.play('up', true);
                    else
                      this.anims.play('upHurt', true);
                    if (cursors.left.isDown) {
                        this.calculateVelocity("up", "left");
                    }
                    else if (cursors.right.isDown) {
                        this.calculateVelocity("up", "right");
                    }
                    else
                        this.calculateVelocity("up", "");
                }
                else {
                    this.calculateVelocity("", "");
                    if(!this.invincible)
                      this.anims.play('idleUp', true);
                    else
                      this.anims.play('idleUpHurt', true);
                    this.idleState(cursors);
                }
                break;
            case "down":
                if (cursors.down.isDown) {
                    if(!this.invincible)
                      this.anims.play('down', true);
                    else
                      this.anims.play('downHurt', true);
                    if (cursors.left.isDown) {
                        this.calculateVelocity("down", "left");
                    }
                    else if (cursors.right.isDown) {
                        this.calculateVelocity("down", "right");
                    }
                    else
                        this.calculateVelocity("down", "");
                }
                else {
                    this.calculateVelocity("", "");
                    if(!this.invincible)
                      this.anims.play('idleDown', true);
                    else 
                      this.anims.play('idleDownHurt', true);
                    this.idleState(cursors);
                }
                break;
        }
    }

    idleState(cursors) {
        if (cursors.left.isDown) {
            this.direction = "left";
        }
        else if (cursors.right.isDown) {
            this.direction = "right";
        }
        else if (cursors.up.isDown) {
            this.direction = "up";
        }
        else if (cursors.down.isDown) {
            this.direction = "down";
        }
    }

    playerStop(direction) {
      this.setVelocity(0,0);
      switch (direction) {
          case "left": 
            this.anims.play("idleLeft", true);
            break;
          case "right": 
            this.anims.play("idleRight", true);
            break;
          case "up": 
            this.anims.play("idleUp", true);
            break;
          case "down": 
            this.anims.play("idleDown", true);
            break;
      }
    }

    calculateVelocity(mainDirection, subDirection) {
        var maxSpeed = 180;
        if (mainDirection == "") {
            this.setVelocity(0, 0);
            return;
        }
        if (subDirection == "") {
            switch (mainDirection) {
                case "left":
                    this.setVelocity(-maxSpeed, 0);
                    break;
                case "right":
                    this.setVelocity(maxSpeed, 0);
                    break;
                case "up":
                    this.setVelocity(0, -maxSpeed);
                    break;
                case "down":
                    this.setVelocity(0, maxSpeed);
                    break;
                default:
                    this.setVelocity(0, 0);
                    break;
            }
        }
        else {
            var vel = new Phaser.Math.Vector2();
            switch (mainDirection) {
                case "left":
                    vel.x = -1;
                    if (subDirection == "up")
                        vel.y = -1;
                    else if (subDirection == "down")
                        vel.y = 1;
                    break;
                case "right":
                    vel.x = 1
                    if (subDirection == "up")
                        vel.y = -1;
                    else if (subDirection == "down")
                        vel.y = 1;
                    break;
                case "up":
                    vel.y = -1;
                    if (subDirection == "left")
                        vel.x = -1;
                    else if (subDirection == "right")
                        vel.x = 1;
                    break;
                case "down":
                    vel.y = 1;
                    if (subDirection == "left")
                        vel.x = -1;
                    else if (subDirection == "right")
                        vel.x = 1;
                    break;
            }
            if (vel.x == 1 && vel.y == 1) {
                this.setVelocity(Math.cos(Math.PI * 7 / 4) * maxSpeed, -Math.sin(Math.PI * 7 / 4) * maxSpeed);
            }
            else if (vel.x == 1 && vel.y == -1) {
                this.setVelocity(Math.cos(Math.PI / 4) * maxSpeed, -Math.sin(Math.PI / 4) * maxSpeed);
            }
            else if (vel.x == -1 && vel.y == 1) {
                this.setVelocity(Math.cos(Math.PI * 5 / 4) * maxSpeed, -Math.sin(Math.PI * 5 / 4) * maxSpeed);
            }
            else if (vel.x == -1 && vel.y == -1) {
                this.setVelocity(Math.cos(Math.PI * 3 / 4) * maxSpeed, -Math.sin(Math.PI * 3 / 4) * maxSpeed);
            }
        }
    }
    playerAnimate() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 24, end: 33 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 14, end: 23 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 34, end: 43 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 4, end: 13 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleLeft',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 2, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleRight',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleUp',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 3, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleDown',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'dashDisappear',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 44, end: 44 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'leftHurt',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 24, end: 33 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'rightHurt',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 14, end: 23 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'upHurt',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 34, end: 43 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'downHurt',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 49, end: 58 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleLeftHurt',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 69, end: 78 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'idleRightHurt',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 59, end: 68 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'idleUpHurt',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 79, end: 88 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'idleDownHurt',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 45, end: 45 }),
            frameRate: 10,
            repeat: -1
        })
    }

    dashState() {
        if (this.canDash) {
            this.canDash = false;
            var vel = this.body.velocity;
            if (vel.x > 0 && vel.y > 0) { //downright
                this.setVelocityX(this.body.velocity.x *3 * Math.cos(Math.PI*7/4));
                this.setVelocityY(this.body.velocity.y *3 * -Math.sin(Math.PI*7/4));
            }
            else if (vel.x > 0 && vel.y < 0) { //upright
                this.setVelocityX(this.body.velocity.x *3 * Math.cos(Math.PI/4));
                this.setVelocityY(this.body.velocity.y *3 * Math.sin(Math.PI/4));
            }
            else if (vel.x > 0 && vel.y == 0) { //right
                this.setVelocityX(this.body.velocity.x *3);
            }
            else if (vel.x < 0 && vel.y > 0) { //downleft
                this.setVelocityX(this.body.velocity.x *3 * -Math.cos(Math.PI*5/4));
                this.setVelocityY(this.body.velocity.y *3 * -Math.sin(Math.PI*5/4));
            }
            else if (vel.x < 0 && vel.y < 0) { //upleft
                this.setVelocityX(this.body.velocity.x *3 * -Math.cos(Math.PI*3/4));
                this.setVelocityY(this.body.velocity.y *3 * Math.sin(Math.PI*3/4));
            }
            else if (vel.x < 0 && vel.y == 0) { //left
                this.setVelocityX(this.body.velocity.x *3);
            }
            else if (vel.x == 0 && vel.y > 0) { //up
                this.setVelocityY(this.body.velocity.y *3);
            }
            else if (vel.x == 0 && vel.y < 0) { //down
                this.setVelocityY(this.body.velocity.y *3);
            }
            else if (vel.x == 0 && vel.y == 0) {
                this.canDash = true;
            }
            if(!this.canDash)
                this.anims.play('dashDisappear', true);
        }
    }
}

class PlayerKnife extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'knife');
        config.scene.add.existing(this);
        this.spriteName = 'knife';
        this.depth = 4;
        this.active = true;
        this.visible = false;
    }

    swingCreateAnimation() {
        this.anims.create({
            key: 'swing',
            frames: this.anims.generateFrameNumbers(this.spriteName, { start: 0, end: 3 }),
            frameRate: 30,
            repeat: 0
        });
    }

    swingMotion(x, y, velocity, playerInstance, key) {
        this.visible = true;
        this.active = true;
        switch (key) {
            case "left":
            case "idleLeft":
                this.x = x - 16;
                this.y = y;
                break;
            case "right":
            case "idleRight":
                this.x = x + 16;
                this.y = y;
                break;
            case "up":
            case "idleUp":
                this.x = x;
                this.y = y - 16;
                break;
            case "down":
            case "idleDown":
                this.x = x;
                this.y = y + 16;
                break;
        }
        this.velocity = velocity
        this.anims.play('swing', true);

        this.once('animationcomplete', () => {
            this.visible = false;
            this.active = false;
            playerInstance.canMove = true;
        })

    }
}