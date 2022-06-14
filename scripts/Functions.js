/*-------------------
--Funções do create--
-------------------*/
//settando mapa
function makeCollisionLayer(mapa, sheetName, sheetNameButBigger, layerName) {
    const tileset = mapa.addTilesetImage(sheetName, sheetNameButBigger);
    const collisionLayer = mapa.createLayer(layerName, tileset, 0, 0);
    collisionLayer.setCollisionByProperty({ collides: true });
    return collisionLayer;
}

function makeEnemyLayers(mapa) {
    const layerNames = mapa.getObjectLayerNames();
    const enemySpawnLayers = [];
    for (i = 0; i < layerNames.length; i++) {
        if (layerNames[i].includes('enemy')) {
            enemySpawnLayers.push(mapa.getObjectLayer(layerNames[i]))
        }
    }
    return enemySpawnLayers;
}

function makeLayer(mapa, nome) {
    const layerNames = mapa.getObjectLayerNames();
    for (i = 0; i < layerNames.length; i++) {
        if (layerNames[i].includes(nome)) {
            return mapa.getObjectLayer(layerNames[i]);
        }
    }
}

//settando entidades
function makePlayer(thisScene, location, direction) { //fazer o player
    var playerInstance = new Player({
        scene: thisScene,
        x: location[0] * tileSize,
        y: location[1] * tileSize
    }, 3);
    playerInstance.playerSetup();
    playerInstance.invincible = false;
    playerInstance.direction = direction;
    playerUpdate(playerInstance, thisScene);
    return playerInstance;
}
/*
function makePlayer(mapa, thisScene, location) {
    const playerSpawnLayer = mapa.getObjectLayer("player");
    var spawnLocation;
    playerSpawnLayer.objects.forEach(function (spawn) {
        spawnLocation = [spawn.x, spawn.y];
    }, thisScene);
    var playerInstance = new Player({
        scene: thisScene, x: spawnLocation[0], y: spawnLocation[1]
    }, 3);
    playerInstance.playerSetup();
    playerInstance.invincible = false;
    return playerInstance;
}
*/
function makeEnemyGroups(layers, types, thisScene) {
    var enemyGroups = [];
    for (i = 0; i < layers.length; i++) {
        enemyGroups.push(makeEnemyGroup(layers[i], thisScene, types[i]));
    }
    return enemyGroups;
}

function makeEnemyGroup(enemySpawn, thisScene, classType) {
    const enemyGroup = thisScene.add.group();
    enemyGroup.classType = classType;
    enemySpawn.objects.forEach(function(spawn) {
        enemyGroup.add(new classType({ scene: thisScene, x: spawn.x, y: spawn.y }));
    }, thisScene);
    enemyGroup.children.each(function(enemy) {
        enemy.enemySetup(thisScene);
    }, thisScene);
    return enemyGroup;
}

function makeBulletTimers(enemies, thisScene) {
    var bulletTimers = [];
    enemies.forEach(function(enemyGroup) {
        const thisTimer = thisScene.time.addEvent({
            args: [enemyGroup],
            delay: enemyGroup.getFirst().bulletTimer,
            callback: enemyShoot,
            callbackScope: thisScene,
            loop: true
        })
        bulletTimers.push(thisTimer);
    }, this);
    return bulletTimers;
}

//settando colliders e calculos
function addCollider(player, enemies, thisScene) {
    enemies.forEach(function(enemyGroup) {
        thisScene.physics.add.collider(player, enemyGroup, (player, enemy) => {
            var dir = calculateKnockback(enemy, player);
            enemy.hitDetection(dir);
            thisScene.time.addEvent({
                args: [player, enemy, thisScene],
                delay: 50, // ms
                callback: enemySlashed,
                callbackScope: thisScene,
                loop: false
            });
        }, null, thisScene);
        enemyGroup.children.each(function(enemy) {
            thisScene.physics.add.collider(player, enemy.bullets, (player, hitbox) => {
                if (hitbox.active) {
                    var dir = calculateKnockback(player, hitbox);
                    hitbox.setActive(false).setVisible(false);
                    player.canMove = false;
                    player.hitDetection(1, dir);
                    if (!player.invincible) {
                        thisScene.events.emit('player_hit', player.healthPoints);
                    }
                    player.invincible = true;
                    thisScene.time.addEvent({
                        delay: 50, // ms
                        callback: resetSpeedAndMovement,
                        args: [player],
                        callbackScope: thisScene,
                        loop: false
                    });
                    thisScene.time.addEvent({
                        delay: 1000, // ms
                        callback: resetInvincibility,
                        args: [player],
                        callbackScope: thisScene,
                        loop: false
                    });
                }
            }, null, thisScene);
        }, thisScene);
    }, this)
}

function calculateKnockback(hitter, hitbox) {
    const angle = Phaser.Math.Angle.BetweenPoints(hitbox, hitter);
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(500);
    return dir
}

//settando camera  e calculos relacionados
function setCamera(camera, player, mapa) {
    const playerQuadrant = findPlayerQuadrant(player, mapa);
    camera.startFollow(player);
    camera.setBounds(playerQuadrant[0] * quadrantSize * mapa.tileWidth,
        playerQuadrant[1] * quadrantSize * mapa.tileHeight, quadrantSize * mapa.tileWidth, quadrantSize * mapa.tileHeight);
    camera.setZoom(3);
    return "up";
}

function setCameraFinal(camera, boat, mapa) {
  camera.setBounds(0,0, mapa.tileWidth * 32, mapa.tileHeight * 32, true);
  camera.setZoom(1.69);
  //camera.startFollow(boat);
}

function findPlayerQuadrant(player, mapa) {
    const playerTileX = Math.floor(player.x / mapa.tileWidth);
    const playerQuadrantX = Math.floor(playerTileX / quadrantSize);
    const playerTileY = Math.floor(player.y / mapa.tileHeight);
    const playerQuadrantY = Math.floor(playerTileY / quadrantSize);
    return [playerQuadrantX, playerQuadrantY];
}

/*--------------------
--Funções do update --
--------------------*/
function playerUpdate(player, thisScene) {
    if(!player.alive) {
        return
    }
    
    if (player.slowDown) {
        if(player.powerLeft > 0) {
          thisScene.tweens.timeScale = 2; // tweens
          thisScene.physics.world.timeScale = 2; // physics
          //this.time.timeScale = 0.5; // time events
          player.powerLeft -= 1;
        }
        else {
          thisScene.tweens.timeScale = 1; // tweens
          thisScene.physics.world.timeScale = 1; // physics
        }
    } else {
        if (player.powerLeft < 100)
          player.powerLeft+=1;
        thisScene.tweens.timeScale = 1; // tweens
        thisScene.physics.world.timeScale = 1; // physics
    }
    thisScene.events.emit('power_spent', player.powerLeft);
    cursors = thisScene.input.keyboard.createCursorKeys();
    dashKey = thisScene.input.keyboard.addKey('D');
    slowKey = thisScene.input.keyboard.addKey('S');
    
    if (!player.canDash && !player.timerRunning) {
        player.timerRunning = true;
        player.inDash = true;
        thisScene.time.addEvent({
            args: [player],
            delay: 50,
            callback: function(player) {
                player.inDash = false;
            },
            callbackScope: thisScene,
            loop: false
        }, this);
        thisScene.time.addEvent({
            args: [player],
            delay: player.dashTime,
            callback: function(player) {
                player.canDash = true;
                player.timerRunning = false;
            },
            callbackScope: thisScene,
            loop: false
        }, this);
    }

    player.movementUpdate(cursors, dashKey, slowKey);
}

function enemyUpdate(enemies, player, thisScene) {
    enemies.forEach(function(enemyGroup) {
        enemyGroup.children.each(function(enemy) {
            if (enemy.active == true) {
                enemy.enemyUpdate(Phaser.Math.Angle.BetweenPoints(enemy, player));
            }
        }, thisScene);
    }, this);
}

function killAllEnemies(enemies, thisScene) {
    enemies.forEach(function(enemyGroup) {
        enemyGroup.children.each(function(enemy) {
            enemy.enemyKill();
        }, thisScene);
    }, this)
}

function scrollScreen(camera, player, enemies, mapa, quadrant, thisScene) {
    var newQuadrant = findPlayerQuadrant(player, mapa);
    var direction = findDirection(quadrant, newQuadrant);
    var tweenX = player.x;
    var tweenY = player.y;
    switch (direction) {
        case "up":
            tweenY -= 16;
            break;
        case "down":
            tweenY += 16;
            break;
        case "right":
            tweenX += 16;
            break;
        case "left":
            tweenX -= 16;
            break;
        default:
            break;
    }
    camera.setLerp(0.1, 0.1);
    camera.removeBounds()
    thisScene.tweens.add({
        targets: player,
        x: { value: tweenX, duration: 100, ease: 'power2' },
        y: { value: tweenY, duration: 100, ease: 'Power2' },
        onUpdate: updateBoys,
        onUpdateParams: [camera, direction],
        onComplete: completeBoys,
        onCompleteParams: [camera, player, enemies, mapa, newQuadrant],
        callbackScope: thisScene,
        repeat: 0
    })
    return newQuadrant;
}

function deathScreen(player, died, thisScene, data) {
    if (!player.alive) {
      thisScene.sound.stopAll();
        if (!died) {
            died = true;
            thisScene.scene.launch("DeathScreen");
        }
        else {
          cursors = thisScene.input.keyboard.createCursorKeys();
          if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            thisScene.scene.stop('UI-scene')
            thisScene.scene.start('hubScene', {startingPos: data.startingPos, startingDirection: data.startingDirection, progress: data.progress});
          }
        }
    }
    return died;
}

//Funções de cálculo
function findDirection(playerQuadrant, newPlayerQuadrant) {
    if (playerQuadrant[0] != newPlayerQuadrant[0]) {
        if (playerQuadrant[0] > newPlayerQuadrant[0]) {
            return "left"
        } else return "right"
    } else if (playerQuadrant[1] != newPlayerQuadrant[1]) {
        if (playerQuadrant[1] > newPlayerQuadrant[1]) {
            return "up"
        } else return "down"
    }
    return "";
}

//Funções de managing do player
function resetInvincibility(player) {
    player.invincible = false;
}

function resetSpeedAndMovement(player) {
    player.canMove = true;
    player.setVelocity(0, 0);
}

//Funções de kill de objetos
function enemySlashed(player, enemy, thisScene) {
    //player.attack();
    enemy.enemySlashed();
    thisScene.time.addEvent({
        args: [enemy],
        delay: 600,
        callback: function(enemin) {
            enemin.enemyKill();
        },
        callbackScope: thisScene,
        loop: false
    }, this);
}

function bulletKill(enemies) {
    enemies.children.each(function(enemy) {
        enemy.bullets.children.each(function(bullet) {
            bullet.setActive(false).setVisible(false);
        })
    });
}

function enemyShoot(enemies) {
    enemies.children.each(function(enemy) {
        enemy.enemyShoot();
    });
}

//Funções do tween de scroll
function updateBoys(tween, targets, camera, direction) {
    var cameraRate = 12;
    switch (direction) {
        case "up":
            camera.scrollY -= cameraRate;
            break;
        case "down":
            camera.scrollY += cameraRate;
            break;
        case "right":
            camera.scrollX += cameraRate;
            break;
        case "left":
            camera.scrollX -= cameraRate;
            break;
        default:
            break;
    }
}

function completeBoys(tween, targets, camera, player, enemies, map, quadrant) {
    camera.setBounds(quadrant[0] * quadrantSize * map.tileWidth,
        quadrant[1] * quadrantSize * map.tileHeight, quadrantSize * map.tileWidth, quadrantSize * map.tileHeight);
    camera.startFollow(player);
    enemies.forEach(function(enemyGroup) {
        enemyGroup.children.each(function(enemy) {
            if (Phaser.Geom.Rectangle.Contains(camera.getBounds(), enemy.spawnLocation[0], enemy.spawnLocation[1])) {
                enemy.enemyReset(enemy.spawnLocation);
                //enemy.alive = true;
            }
        });
    }, this);
}