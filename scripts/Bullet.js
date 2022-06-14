class Bullet extends Phaser.Physics.Arcade.Sprite
{
    current_scene

    constructor (scene, x, y)
    {
        super(scene, x, y, 'bullet');
        this.current_scene = scene
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
    }

    fireBullet(x,y,angle,speed) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(speed*Math.cos(angle));
        this.setVelocityY(speed*Math.sin(angle));
    }
    
    singleBulletKill() {
        this.setActive(false);
        this.setVisible(false);
    }
}

class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene, bulletAmount)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: bulletAmount,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    greenSlimeCounter = 0;
    greenSlimeGate = false;
    grassTrapCounter = 0;
    grassTrapGate = false;
    sandTrapCounter = 0;
    sandTrapGate1 = false;
    sandTrapGate2 = false;
    sandTrapSwitch = false;

    bulletKill(){
        this.setActive(false);
        this.setVisible(false);
        this.children.each(function(bullet){
            bullet.setVelocity(0,0);
            bullet.setActive(false);
            bullet.setVisible(false);
        })
    }

    fireBulletCross(x,y,speed)
    {
        let bullet = this.getFirstDead(false);
        if(!this.greenSlimeGate) {
            if(this.countActive(false) >= 4) {
                this.greenSlimeGate = true;
            }
        }
        if(bullet && this.greenSlimeGate) {
            switch (this.greenSlimeCounter) {
                case 0:
                    bullet.fireBullet(x,y,0,speed);
                    break;
                case 1:
                    bullet.fireBullet(x,y,Math.PI/2,speed);
                    break;
                case 2: 
                    bullet.fireBullet(x,y,Math.PI,speed);
                    break;
                case 3:
                    bullet.fireBullet(x,y,3*Math.PI/2,speed);
                    break;
            }
            this.greenSlimeCounter++;
            this.greenSlimeCounter = this.greenSlimeCounter % 4;
            if(this.greenSlimeCounter == 0 ){
                this.greenSlimeGate = false;
            }
        }
    }

    fireBulletFollow(x,y,angle,speed)
    {
        let bullet = this.getFirstDead(false);   
        if (bullet)
        {
            bullet.fireBullet(x, y, angle, speed);
        }
    }

    fireBulletXShape(x,y,angle,speed) {
        let bullet = this.getFirstDead(false);
        if (bullet)
        {
            bullet.fireXShape(x, y, angle, speed);
        }        
    }

    fireBulletHorizontal(x,y,speed) {
      let bullet = this.getFirstDead(false);
      if(!this.grassTrapGate) {
            if(this.countActive(false) >= 2) {
                this.grassTrapGate = true;
            }
      }
      if(bullet && this.grassTrapGate) {
            switch (this.grassTrapCounter) {
                case 0:
                    bullet.fireBullet(x,y,0,speed);
                    break;
                case 1: 
                    bullet.fireBullet(x,y,Math.PI,speed);
                    break;
            }
            this.grassTrapCounter++;
            this.grassTrapCounter = this.grassTrapCounter % 2;
            if(this.grassTrapCounter == 0 ){
                this.grassTrapGate = false;
            }
        }
    }

    fireBulletCrossAndX(x,y,speed) {
      let bullet = this.getFirstDead(false);
      if(!this.sandTrapGate1 && !this.sandTrapSwitch) {
            if(this.countActive(false) >= 4) {
                this.sandTrapGate1 = true;
            }
      }
      if (!this.sandTrapGate2 && this.sandTrapSwitch) {
            if(this.countActive(false) >= 4) {
                this.sandTrapGate2 = true;
            }
      }
      if(bullet && this.sandTrapGate1) {
            switch (this.sandTrapCounter) {
                case 0:
                    bullet.fireBullet(x,y,0,speed);
                    break;
                case 1:
                    bullet.fireBullet(x,y,Math.PI/2,speed);
                    break;
                case 2: 
                    bullet.fireBullet(x,y,Math.PI,speed);
                    break;
                case 3:
                    bullet.fireBullet(x,y,3*Math.PI/2,speed);
                    break;
            }
            this.sandTrapCounter++;
            this.sandTrapCounter = this.sandTrapCounter % 4;
            if(this.sandTrapCounter == 0 ){
                this.sandTrapGate1 = false;
                this.sandTrapSwitch = true;
            }
      }
      if(bullet && this.sandTrapGate2) {
            switch (this.sandTrapCounter) {
                case 0:
                    bullet.fireBullet(x,y,Math.PI/4,speed);
                    break;
                case 1:
                    bullet.fireBullet(x,y,Math.PI*3/4,speed);
                    break;
                case 2: 
                    bullet.fireBullet(x,y,Math.PI*5/4,speed);
                    break;
                case 3:
                    bullet.fireBullet(x,y,Math.PI*7/4,speed);
                    break;
            }
            this.sandTrapCounter++;
            this.sandTrapCounter = this.sandTrapCounter % 4;
            if(this.sandTrapCounter == 0 ){
                this.sandTrapGate2 = false;
                this.sandTrapSwitch = false;
            }
      }
    }
  }