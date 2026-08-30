namespace SpriteKind {
    export const Show = SpriteKind.create()
    export const fallingCrate = SpriteKind.create()
    export const showCutscene = SpriteKind.create()
    export const boxDestroyer = SpriteKind.create()
}
// FASTEST TIMES DESTROYING EVERYTHING (crates, enemies, etc.)
// 
// Level 1 = 86 sec.
// 
// Level 2
function title () {
    cutsceneColors()
    titleScreen = true
    timer.background(function () {
        pressA = false
        music.play(music.createSong(assets.song`TITLE intro1`), music.PlaybackMode.UntilDone)
        pressA = true
        music.play(music.createSong(assets.song`TITLE2`), music.PlaybackMode.LoopingInBackground)
    })
    level = 1
    fallHit = false
    scene.setBackgroundColor(8)
    tiles.setCurrentTilemap(tilemap`cutsceneLevel`)
    cutscenePlayer = sprites.create(assets.image`Player_Idle_image`, SpriteKind.showCutscene)
    tiles.placeOnTile(cutscenePlayer, tiles.getTileLocation(0, 10))
    animation.runImageAnimation(
    cutscenePlayer,
    assets.animation`Player_Run`,
    50,
    true
    )
    scene.cameraFollowSprite(cutscenePlayer)
    cutscenePlayer.vx = 150
    cutscenePlayer.ay = 400
    timer.after(1500, function () {
        cutscenePlayer.fx = 400
        timer.after(200, function () {
            animation.runImageAnimation(
            cutscenePlayer,
            assets.animation`Cutscene_Skid`,
            200,
            false
            )
            music.play(music.createSoundEffect(WaveShape.Noise, 2189, 2210, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            timer.after(200, function () {
                animation.runImageAnimation(
                cutscenePlayer,
                assets.animation`Player_Idle`,
                200,
                true
                )
                timer.after(800, function () {
                    animation.runImageAnimation(
                    cutscenePlayer,
                    assets.animation`Cutscene_LookUp`,
                    50,
                    false
                    )
                    cutsceneBatSprite = sprites.create(assets.image`Bat_Image`, SpriteKind.Show)
                    animation.runImageAnimation(
                    cutsceneBatSprite,
                    assets.animation`Bat_Fly_Forward`,
                    100,
                    true
                    )
                    tiles.placeOnTile(cutsceneBatSprite, tiles.getTileLocation(17, 4))
                    cutsceneBatSprite.vy += 8
                    cutsceneBatSprite.x += -6
                    newSprite = sprites.create(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `, SpriteKind.Show)
                    newSprite.setPosition(cutscenePlayer.x, cutscenePlayer.y)
                    scene.cameraFollowSprite(newSprite)
                    newSprite.vy = -60
                    timer.after(500, function () {
                        newSprite.vy = 0
                        sprites.destroy(newSprite)
                        scene.cameraFollowSprite(null)
                        timer.after(1200, function () {
                            animation.runImageAnimation(
                            cutscenePlayer,
                            assets.animation`Player_RevDash`,
                            75,
                            true
                            )
                            music.play(music.createSoundEffect(WaveShape.Noise, 1, 5000, 255, 0, 500, SoundExpressionEffect.Tremolo, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
                            timer.after(500, function () {
                                poofs(cutscenePlayer, false, 1, 4)
                                animation.runImageAnimation(
                                cutscenePlayer,
                                assets.animation`Player_Jump`,
                                100,
                                false
                                )
                                music.play(music.createSoundEffect(WaveShape.Noise, 5000, 1, 255, 0, 500, SoundExpressionEffect.Tremolo, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
                                cutscenePlayer.vy = -225
                                timer.after(550, function () {
                                    animation.runImageAnimation(
                                    cutscenePlayer,
                                    assets.animation`Player_Hurt`,
                                    100,
                                    true
                                    )
                                    animation.runImageAnimation(
                                    cutsceneBatSprite,
                                    assets.animation`Bat_Backtrack`,
                                    100,
                                    true
                                    )
                                    cutscenePlayer.vx = -100
                                    cutscenePlayer.fx = 100
                                    cutsceneBatSprite.vy = 0
                                    fallHit = true
                                    timer.background(function () {
                                        pauseUntil(() => fallHit == false)
                                        animation.runImageAnimation(
                                        cutsceneBatSprite,
                                        assets.animation`Bat_Fly_Forward`,
                                        100,
                                        true
                                        )
                                        timer.after(1000, function () {
                                            animation.runImageAnimation(
                                            cutsceneBatSprite,
                                            createFlipped(assets.animation`Bat_Fly_Forward`),
                                            100,
                                            true
                                            )
                                            cutsceneBatSprite.vx = 200
                                            cutsceneBatSprite.setFlag(SpriteFlag.AutoDestroy, true)
                                        })
                                        timer.after(2500, function () {
                                            animation.runImageAnimation(
                                            cutscenePlayer,
                                            assets.animation`Player_Idle`,
                                            200,
                                            true
                                            )
                                            timer.after(1500, function () {
                                                animation.runImageAnimation(
                                                cutscenePlayer,
                                                assets.animation`Player_RevDash`,
                                                75,
                                                true
                                                )
                                                music.play(music.createSoundEffect(WaveShape.Noise, 1, 5000, 255, 0, 500, SoundExpressionEffect.Tremolo, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
                                                timer.after(1000, function () {
                                                    cutscenePlayer.vx = 250
                                                    cutscenePlayer.fx = 0
                                                    animation.runImageAnimation(
                                                    cutscenePlayer,
                                                    assets.animation`Player_Run`,
                                                    50,
                                                    true
                                                    )
                                                    music.play(music.createSoundEffect(WaveShape.Noise, 5000, 1, 255, 0, 500, SoundExpressionEffect.Tremolo, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
                                                    cutscenePlayer.setFlag(SpriteFlag.AutoDestroy, true)
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile8`)
    projectile = sprites.createProjectileFromSprite(assets.image`POW`, playerCharacter, 0, 0)
    projectile.ax = 600
    music.play(music.createSoundEffect(WaveShape.Noise, 1162, 1607, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    projectile.setFlag(SpriteFlag.AutoDestroy, false)
    projectile.setFlag(SpriteFlag.DestroyOnWall, true)
    poofs(projectile, false, 4, 8)
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (playerCharacter.isHittingTile(CollisionDirection.Left) || playerCharacter.isHittingTile(CollisionDirection.Right)) {
        if (tiles.tileAtLocationEquals(location, assets.tile`myTile9`) && Math.abs(playerCharacter.vx) > 100) {
            tiles.setWallAt(location, false)
            tiles.setTileAt(location, assets.tile`transparency16`)
            playerCharacter.vx = direction * 100
            crateFly(location, direction)
        }
    }
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        invincible = false
        flinging = false
        if (playerCharacter.tilemapLocation().row == tileUtil.tilemapProperty(currentLevelTilemap, tileUtil.TilemapProperty.Rows) - 1 && playerControl) {
            playerControl = false
            die()
        }
    }
})
function createFlipped (anim: Image[]) {
    tempList = []
    for (let Frame = 0; Frame <= anim.length - 1; Frame++) {
        tempImage = anim[Frame]
        tempImage.flipX()
        tempList.push(tempImage)
    }
    return tempList
}
function createRecolor (anim: Image[]) {
    tempList = []
    for (let Frame2 = 0; Frame2 <= anim.length - 1; Frame2++) {
        tempImage = anim[Frame2]
        tempImage.replace(1, 2)
        tempList.push(tempImage)
    }
    return tempList
}
scene.onHitWall(SpriteKind.showCutscene, function (sprite, location) {
    if (fallHit == true) {
        if (sprite.isHittingTile(CollisionDirection.Bottom)) {
            fallHit = false
            timer.background(function () {
                poofs(cutscenePlayer, false, 1, 1)
                timer.after(100, function () {
                    poofs(cutscenePlayer, false, 1, 1)
                    timer.after(100, function () {
                        poofs(cutscenePlayer, false, 1, 1)
                    })
                })
            })
            music.play(music.createSoundEffect(WaveShape.Noise, 2189, 2210, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            animation.runImageAnimation(
            sprite,
            assets.animation`Cutscene_CrouchSkid`,
            500,
            false
            )
            timer.after(800, function () {
                animation.runImageAnimation(
                sprite,
                assets.animation`Player_Idle`,
                200,
                true
                )
            })
            timer.after(1000, function () {
                animation.runImageAnimation(
                sprite,
                assets.animation`Cutscene_LookUp`,
                50,
                false
                )
            })
        }
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (titleScreen == false && playerControl == true) {
        newLocation = tiles.getTileLocation(playerCharacter.tilemapLocation().column + direction, playerCharacter.tilemapLocation().row)
        if (carryingBox == true) {
            invincible = false
            if (direction == 1) {
                animation.runImageAnimation(
                playerCharacter,
                assets.animation`Player_Throw`,
                100,
                false
                )
            } else {
                animation.runImageAnimation(
                playerCharacter,
                createFlipped(assets.animation`Player_Throw`),
                100,
                false
                )
            }
            timer.after((assets.animation`Player_Throw`.length - 3) * 100, function () {
                carryBox.setFlag(SpriteFlag.AutoDestroy, true)
                carryBox.setFlag(SpriteFlag.DestroyOnWall, false)
                sprites.setDataNumber(carryBox, "boxDirection", direction)
                carryBox.vx = sprites.readDataNumber(carryBox, "boxDirection") * 400
                carryBox.setKind(SpriteKind.boxDestroyer)
                animation.runImageAnimation(
                carryBox,
                assets.animation`BoxFly`,
                50,
                true
                )
                carryBox.y += -5
            })
            timer.after(assets.animation`Player_Throw`.length * 100, function () {
                carryingBox = false
                characterAnimations.setCharacterAnimationsEnabled(playerCharacter, true)
            })
        } else if (carryingBox == false) {
            if (tiles.tileAtLocationIsWall(newLocation) && tiles.tileAtLocationEquals(newLocation, assets.tile`myTile9`)) {
                carryingBox = true
                invincible = true
                playerCharacter.vx = 0
                tiles.setWallAt(newLocation, false)
                tiles.setTileAt(newLocation, assets.tile`transparency16`)
                characterAnimations.setCharacterAnimationsEnabled(playerCharacter, false)
                characterAnimations.clearCharacterState(playerCharacter)
                if (direction == 1) {
                    animation.runImageAnimation(
                    playerCharacter,
                    assets.animation`Player_Carry`,
                    200,
                    false
                    )
                } else {
                    animation.runImageAnimation(
                    playerCharacter,
                    createFlipped(assets.animation`Player_Carry`),
                    200,
                    false
                    )
                }
                carryBox = sprites.create(assets.image`Box`, SpriteKind.Show)
                carryBox.setPosition(playerCharacter.x, playerCharacter.y - 16)
            }
        }
    }
})
function setupAnim () {
    idleRight = assets.animation`Player_Idle`
    idleLeft = createFlipped(assets.animation`Player_Idle`)
    walkRight = assets.animation`Player_Walk`
    walkLeft = createFlipped(assets.animation`Player_Walk`)
    runRight = assets.animation`Player_Run`
    runLeft = createFlipped(assets.animation`Player_Run`)
    runUpRight = assets.animation`Player_RunUP`
    runUpLeft = createFlipped(assets.animation`Player_RunUP`)
    upRight = assets.animation`Player_Jump`
    upLeft = createFlipped(assets.animation`Player_Jump`)
    hurtRight = assets.animation`Player_Hurt`
    hurtLeft = createFlipped(assets.animation`Player_Hurt`)
    crouchRight = assets.animation`Player_Crouch`
    crouchLeft = createFlipped(assets.animation`Player_Crouch`)
    revRight = assets.animation`Player_RevDash`
    revLeft = createFlipped(assets.animation`Player_RevDash`)
    crawlerRight = assets.animation`Crawler`
    crawlerLeft = createFlipped(assets.animation`Crawler`)
    characterAnimations.loopFrames(
    playerCharacter,
    idleRight,
    200,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    playerCharacter,
    idleLeft,
    200,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    playerCharacter,
    walkRight,
    100,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    playerCharacter,
    walkLeft,
    100,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    playerCharacter,
    runRight,
    50,
    characterAnimations.rule(Predicate.MovingRight, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    playerCharacter,
    runLeft,
    50,
    characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    playerCharacter,
    upRight,
    100,
    characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    playerCharacter,
    upLeft,
    100,
    characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    playerCharacter,
    runUpRight,
    50,
    characterAnimations.rule(Predicate.MovingUp, Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    playerCharacter,
    runUpLeft,
    50,
    characterAnimations.rule(Predicate.MovingUp, Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    playerCharacter,
    hurtRight,
    100,
    characterAnimations.rule(Predicate.FacingDown, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    playerCharacter,
    hurtLeft,
    100,
    characterAnimations.rule(Predicate.FacingDown, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    playerCharacter,
    revRight,
    75,
    characterAnimations.rule(Predicate.FacingUp, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    playerCharacter,
    revLeft,
    75,
    characterAnimations.rule(Predicate.FacingUp, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    playerCharacter,
    crouchRight,
    100,
    characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    playerCharacter,
    crouchLeft,
    100,
    characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
    )
    for (let groundBuggers of sprites.allOfKind(SpriteKind.Enemy)) {
        characterAnimations.loopFrames(
        groundBuggers,
        crawlerRight,
        50,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        groundBuggers,
        crawlerLeft,
        50,
        characterAnimations.rule(Predicate.MovingLeft)
        )
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile13`, function (sprite, location) {
    if (playerControl) {
        playerControl = false
        color.startFadeFromCurrent(color.Black, 250)
        timer.after(250, function () {
            level += 1
            Start(level)
        })
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (titleScreen == false) {
        if (playerControl == true && carryingBox == false) {
            if (!(controller.down.isPressed()) && revving == false) {
                if (runningUp == false) {
                    if (playerCharacter.vy == 0) {
                        playerCharacter.vy = -125
                        music.play(music.createSoundEffect(WaveShape.Square, 1620, 3212, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
                    }
                } else {
                    music.play(music.createSoundEffect(WaveShape.Square, 2218, 3821, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
                    runningUp = false
                    playerCharacter.ay = 400
                    playerCharacter.vx = direction * -100
                }
            } else {
                if (playerControl == true) {
                    if (runningUp == false) {
                        if (playerCharacter.vy == 0) {
                            revving = true
                            music.play(music.createSoundEffect(WaveShape.Noise, 1730, 3353, 255, 0, 500, SoundExpressionEffect.Tremolo, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
                        }
                    }
                }
            }
        }
    } else {
        if (pressA) {
            titleScreen = false
            music.stopAllSounds()
            music.play(music.createSoundEffect(WaveShape.Sawtooth, 1749, 1749, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
            music.play(music.createSoundEffect(WaveShape.Sawtooth, 1749, 1749, 115, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
            music.play(music.createSoundEffect(WaveShape.Sawtooth, 1749, 1749, 53, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
            music.play(music.createSoundEffect(WaveShape.Sawtooth, 1749, 1749, 20, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
            color.startFadeFromCurrent(color.Black, 250)
            timer.after(250, function () {
                Start(level)
            })
        }
    }
})
function Start (level: number) {
    deleteEVERYTHING()
    music.stopAllSounds()
    color.startFadeFromCurrent(color.originalPalette, 250)
    carryingBox = false
    revving = false
    runningUp = false
    timeFromStart = Math.floor(game.runtime() * 0.001)
    playerControl = true
    health = 4
    playerCharacter = sprites.create(assets.image`Player_Idle_image`, SpriteKind.Player)
    scene.setBackgroundColor(8)
    direction = 1
    playerCharacter.ay = 400
    scene.cameraFollowSprite(playerCharacter)
    flinging = false
    invincible = false
    if (level == 1) {
        tiles.setCurrentTilemap(tilemap`PitfellValley`)
        currentLevelTilemap = tilemap`PitfellValley`
        tiles.placeOnTile(playerCharacter, tiles.getTileLocation(47, 0))
        tiles.placeOnTile(playerCharacter, tiles.getTileLocation(0, 13))
        timer.background(function () {
            music.play(music.createSong(assets.song`PV intro`), music.PlaybackMode.UntilDone)
            music.play(music.createSong(assets.song`Pitfell Valley0`), music.PlaybackMode.LoopingInBackground)
        })
    } else if (level == 2) {
        timer.after(300, function () {
            color.setColor(6, color.parseColorString("#f0f0f0"))
            color.setColor(10, color.parseColorString("#4E4141"))
            color.setColor(8, color.parseColorString("#71b4e3"))
        })
        tiles.setCurrentTilemap(tilemap`ArgonPeaks`)
        currentLevelTilemap = tilemap`ArgonPeaks`
        tiles.placeOnTile(playerCharacter, tiles.getTileLocation(0, 27))
        timer.background(function () {
            music.play(music.createSong(assets.song`AP intro`), music.PlaybackMode.UntilDone)
            music.play(music.createSong(assets.song`Argon Peaks`), music.PlaybackMode.LoopingInBackground)
        })
    }
    for (let grounders of tiles.getTilesByType(assets.tile`myTile16`)) {
        groundbug = sprites.create(assets.image`Box`, SpriteKind.Enemy)
        sprites.setDataNumber(groundbug, "direction", -1)
        groundbug.vx = -20
        groundbug.ay = 400
        tiles.placeOnTile(groundbug, grounders)
        tiles.setTileAt(grounders, assets.tile`transparency16`)
    }
    setupAnim()
}
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    if (titleScreen == false && playerControl == true) {
        if (revving == true) {
            playerCharacter.vx = direction * 200
            playerCharacter.vy = -25
            music.play(music.createSoundEffect(WaveShape.Noise, 3612, 1295, 255, 0, 500, SoundExpressionEffect.Tremolo, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
            revving = false
            flinging = true
        }
    }
})
function crateFly (location: tiles.Location, multiplier: number) {
    Crate = sprites.create(assets.image`Box`, SpriteKind.Show)
    animation.runImageAnimation(
    Crate,
    assets.animation`BoxFly`,
    50,
    true
    )
    music.play(music.createSoundEffect(WaveShape.Noise, 523, 1, 255, 0, 600, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    scene.cameraShake(2, 500)
    tiles.placeOnTile(Crate, tiles.getTileLocation(location.column, location.row))
    Crate.vx = multiplier * 400
    Crate.vy = -90
    Crate.setFlag(SpriteFlag.AutoDestroy, true)
    Crate.setFlag(SpriteFlag.GhostThroughWalls, true)
}
function die () {
    music.stopAllSounds()
    playerControl = false
    characterAnimations.setCharacterAnimationsEnabled(playerCharacter, false)
    characterAnimations.clearCharacterState(playerCharacter)
    animation.runImageAnimation(
    playerCharacter,
    assets.animation`Player_Dead`,
    200,
    false
    )
    color.setColor(13, color.parseColorString("#FFFFFF"), 500)
    scene.cameraFollowSprite(null)
    playerCharacter.vx = 0
    playerCharacter.vy = -200
    playerCharacter.setFlag(SpriteFlag.AutoDestroy, true)
    playerCharacter.setFlag(SpriteFlag.GhostThroughWalls, true)
    timer.background(function () {
        music.play(music.createSong(assets.song`Dead1`), music.PlaybackMode.UntilDone)
        timer.after(1500, function () {
            color.startFadeFromCurrent(color.Black, 250)
            timer.after(250, function () {
                Start(level)
            })
        })
    })
}
function cutsceneColors () {
    color.setColor(2, color.parseColorString("808080"))
    color.setColor(6, color.parseColorString("575757"))
    color.setColor(8, color.parseColorString("616161"))
    color.setColor(10, color.parseColorString("333333"))
    color.setColor(11, color.parseColorString("9c9c9c"))
    color.setColor(12, color.parseColorString("dbdbdb"))
    color.setColor(13, color.parseColorString("d9d9d9"))
    color.setColor(14, color.parseColorString("474747"))
}
scene.onHitWall(SpriteKind.fallingCrate, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        tiles.setTileAt(tiles.getTileLocation(location.column, location.row - 1), assets.tile`myTile9`)
        tiles.setWallAt(tiles.getTileLocation(location.column, location.row - 1), true)
        sprites.destroy(sprite)
    }
})
scene.onHitWall(SpriteKind.boxDestroyer, function (sprite, location) {
    if (sprite.tileKindAt(TileDirection.Left, assets.tile`myTile28`) || sprite.tileKindAt(TileDirection.Right, assets.tile`myTile28`)) {
        tiles.setTileAt(tiles.getTileLocation(0, 0), assets.tile`transparency16`)
        tiles.setWallAt(tiles.getTileLocation(0, 0), false)
        poofs(sprite, true, 4, 4)
        sprites.destroy(sprite)
    } else if (!(sprite.tileKindAt(TileDirection.Left, assets.tile`myTile9`) || sprite.tileKindAt(TileDirection.Right, assets.tile`myTile9`))) {
        poofs(sprite, true, 4, 4)
        sprites.destroy(sprite)
    }
})
function boxDestroy (sprite: Sprite, location: tiles.Location) {
    if (sprite.tileKindAt(TileDirection.Left, assets.tile`myTile9`) || sprite.tileKindAt(TileDirection.Right, assets.tile`myTile9`)) {
        tiles.setWallAt(tiles.getTileLocation(location.column + sprites.readDataNumber(sprite, "boxDirection"), location.row), false)
        tiles.setTileAt(tiles.getTileLocation(location.column + sprites.readDataNumber(sprite, "boxDirection"), location.row), assets.tile`transparency16`)
        crateFly(tiles.getTileLocation(location.column + sprites.readDataNumber(sprite, "boxDirection"), location.row), sprites.readDataNumber(sprite, "boxDirection"))
    }
}
function deleteEVERYTHING () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    sprites.destroyAllSpritesOfKind(SpriteKind.Show)
    sprites.destroyAllSpritesOfKind(SpriteKind.showCutscene)
    sprites.destroyAllSpritesOfKind(SpriteKind.fallingCrate)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
}
sprites.onDestroyed(SpriteKind.showCutscene, function (sprite) {
    timer.after(1950, function () {
        color.startFadeFromCurrent(color.originalPalette, 100)
        EMORUSH = sprites.create(assets.image`EMORUSH_image`, SpriteKind.Show)
        tiles.placeOnTile(EMORUSH, tiles.getTileLocation(15, 6))
        EMORUSH.x += 8
        EMORUSH.setScale(2, ScaleAnchor.Middle)
        poofs(EMORUSH, false, 20, 45)
    })
})
function poofs (sprite: Sprite, expoldeTrue: boolean, amount: number, distance: number) {
    for (let index = 0; index < amount; index++) {
        timer.after(randint(0, 200), function () {
            poofPoof = sprites.create(assets.image`pof`, SpriteKind.Show)
            poofPoof.setPosition(sprite.x + randint(distance * -1, distance), sprite.y + randint(distance * -1, distance))
            if (expoldeTrue) {
                animation.runImageAnimation(
                poofPoof,
                createRecolor(assets.animation`Poof`),
                100,
                false
                )
            } else {
                animation.runImageAnimation(
                poofPoof,
                assets.animation`Poof`,
                100,
                false
                )
            }
            timer.after(300, function () {
                sprites.destroy(poofPoof)
            })
        })
    }
}
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    poofs(sprite, true, 4, 8)
    tiles.setWallAt(sprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Right), false)
    tiles.setTileAt(sprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Right), assets.tile`transparency16`)
    scene.cameraShake(4, 500)
    location = sprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Right)
    tiles.setWallAt(tiles.getTileLocation(location.column, location.row + 1), false)
    tiles.setTileAt(tiles.getTileLocation(location.column, location.row + 1), assets.tile`myTile14`)
    tiles.setWallAt(tiles.getTileLocation(location.column, location.row - 1), false)
    tiles.setTileAt(tiles.getTileLocation(location.column, location.row - 1), assets.tile`myTile15`)
    timer.background(function () {
        music.play(music.createSoundEffect(WaveShape.Noise, 727, 338, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
        music.play(music.createSoundEffect(WaveShape.Noise, 154, 95, 255, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (playerControl == true) {
        if (invincible == false) {
            if (sprite.y < otherSprite.y && sprite.vy > 0) {
                otherSprite.setKind(SpriteKind.Show)
                otherSprite.vx = 0
                characterAnimations.setCharacterAnimationsEnabled(otherSprite, false)
                characterAnimations.clearCharacterState(otherSprite)
                sprite.vy = -50
                if (sprites.readDataNumber(otherSprite, "direction") == 1) {
                    animation.runImageAnimation(
                    otherSprite,
                    assets.animation`crawlerSQUICH`,
                    200,
                    false
                    )
                } else {
                    animation.runImageAnimation(
                    otherSprite,
                    createFlipped(assets.animation`crawlerSQUICH`),
                    200,
                    false
                    )
                }
                timer.after(500, function () {
                    poofs(otherSprite, true, 4, 8)
                    sprites.destroy(otherSprite)
                })
            } else {
                invincible = true
                flinging = true
                sprite.vx = sprite.vx + direction * -200
                sprite.vy = -75
                health += -1
                if (health < 1) {
                    die()
                }
            }
        }
    }
})
let currentTime = 0
let textSprite2: TextSprite = null
let textSprite: TextSprite = null
let cratefall: Sprite = null
let location: tiles.Location = null
let poofPoof: Sprite = null
let EMORUSH: Sprite = null
let Crate: Sprite = null
let groundbug: Sprite = null
let health = 0
let timeFromStart = 0
let runningUp = false
let revving = false
let crawlerLeft: Image[] = []
let crawlerRight: Image[] = []
let revLeft: Image[] = []
let revRight: Image[] = []
let crouchLeft: Image[] = []
let crouchRight: Image[] = []
let hurtLeft: Image[] = []
let hurtRight: Image[] = []
let upLeft: Image[] = []
let upRight: Image[] = []
let runUpLeft: Image[] = []
let runUpRight: Image[] = []
let runLeft: Image[] = []
let runRight: Image[] = []
let walkLeft: Image[] = []
let walkRight: Image[] = []
let idleLeft: Image[] = []
let idleRight: Image[] = []
let carryBox: Sprite = null
let carryingBox = false
let newLocation: tiles.Location = null
let tempImage: Image = null
let tempList: Image[] = []
let currentLevelTilemap: tiles.TileMapData = null
let flinging = false
let invincible = false
let direction = 0
let playerCharacter: Sprite = null
let projectile: Sprite = null
let newSprite: Sprite = null
let cutsceneBatSprite: Sprite = null
let cutscenePlayer: Sprite = null
let fallHit = false
let pressA = false
let titleScreen = false
let level = 0
let playerControl = false
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 240
    export const ARCADE_SCREEN_HEIGHT = 160
}
color.setPalette(
color.originalPalette
)
playerControl = false
level = 2
title()
game.onUpdate(function () {
    if (playerControl == true) {
        if (invincible == false) {
            if (carryingBox == false) {
                if (controller.right.isPressed()) {
                    if (!(controller.down.isPressed() || revving == true)) {
                        direction = 1
                        if (runningUp == false) {
                            if (playerCharacter.vx > 100) {
                                playerCharacter.vx += 5
                            } else {
                                playerCharacter.vx += 3
                            }
                        } else {
                            if (playerCharacter.vy < -100) {
                                playerCharacter.vy += -5
                            } else {
                                playerCharacter.vy += -3
                            }
                        }
                    } else {
                        playerCharacter.vx += playerCharacter.vx * -0.1
                    }
                } else if (controller.left.isPressed()) {
                    if (!(controller.down.isPressed() || revving == true)) {
                        direction = -1
                        if (runningUp == false) {
                            if (playerCharacter.vx < -100) {
                                playerCharacter.vx += -5
                            } else {
                                playerCharacter.vx += -2
                            }
                        } else {
                            if (playerCharacter.vy < -100) {
                                playerCharacter.vy += -5
                            } else {
                                playerCharacter.vy += -2
                            }
                        }
                    } else {
                        playerCharacter.vx += playerCharacter.vx * -0.1
                    }
                } else {
                    if (runningUp == false) {
                        if (flinging == false) {
                            playerCharacter.vx += playerCharacter.vx * -0.1
                        }
                    } else {
                        playerCharacter.vy += playerCharacter.vy * -0.1
                    }
                }
                if (!(controller.down.isPressed())) {
                    if (controller.right.isPressed() && playerCharacter.vx < 0) {
                        playerCharacter.vx += 10
                    } else if (controller.left.isPressed() && playerCharacter.vx > 0) {
                        playerCharacter.vx += -10
                    }
                }
            }
        }
        if (playerCharacter.vx > 200) {
            playerCharacter.vx = 200
        } else if (playerCharacter.vx < -200) {
            playerCharacter.vx = -200
        }
        if (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(playerCharacter.tilemapLocation().column + 1, playerCharacter.tilemapLocation().row))) && direction == 1 || playerCharacter.vy > -90 && runningUp == true) {
            runningUp = false
            playerCharacter.ay = 400
        } else if (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(playerCharacter.tilemapLocation().column - 1, playerCharacter.tilemapLocation().row))) && direction == -1 || playerCharacter.vy > -90 && runningUp == true) {
            runningUp = false
            playerCharacter.ay = 400
        }
        if (invincible == false) {
            if (playerCharacter.vy == 0) {
                if (playerCharacter.vx > 10 && playerCharacter.vx < 101) {
                    characterAnimations.setCharacterState(playerCharacter, characterAnimations.rule(Predicate.MovingRight))
                } else if (playerCharacter.vx < -10 && playerCharacter.vx > -101) {
                    characterAnimations.setCharacterState(playerCharacter, characterAnimations.rule(Predicate.MovingLeft))
                } else if (playerCharacter.vx > 100) {
                    characterAnimations.setCharacterState(playerCharacter, characterAnimations.rule(Predicate.MovingRight, Predicate.FacingRight))
                } else if (playerCharacter.vx < -101) {
                    characterAnimations.setCharacterState(playerCharacter, characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingLeft))
                } else {
                    if (controller.down.isPressed() && revving) {
                        if (direction == 1) {
                            characterAnimations.setCharacterState(playerCharacter, characterAnimations.rule(Predicate.FacingUp, Predicate.FacingRight))
                        } else {
                            characterAnimations.setCharacterState(playerCharacter, characterAnimations.rule(Predicate.FacingUp, Predicate.FacingLeft))
                        }
                    } else if (controller.down.isPressed() && revving == false) {
                        if (direction == 1) {
                            characterAnimations.setCharacterState(playerCharacter, characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight))
                        } else {
                            characterAnimations.setCharacterState(playerCharacter, characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft))
                        }
                    } else {
                        if (direction == 1) {
                            characterAnimations.setCharacterState(playerCharacter, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight))
                        } else {
                            characterAnimations.setCharacterState(playerCharacter, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft))
                        }
                    }
                }
            } else {
                if (runningUp == false) {
                    if (direction == 1) {
                        characterAnimations.setCharacterState(playerCharacter, characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight))
                    } else {
                        characterAnimations.setCharacterState(playerCharacter, characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft))
                    }
                } else {
                    if (direction == 1) {
                        characterAnimations.setCharacterState(playerCharacter, characterAnimations.rule(Predicate.MovingUp, Predicate.MovingRight))
                    } else {
                        characterAnimations.setCharacterState(playerCharacter, characterAnimations.rule(Predicate.MovingUp, Predicate.MovingLeft))
                    }
                }
            }
        } else {
            if (direction == 1) {
                characterAnimations.setCharacterState(playerCharacter, characterAnimations.rule(Predicate.FacingDown, Predicate.FacingRight))
            } else {
                characterAnimations.setCharacterState(playerCharacter, characterAnimations.rule(Predicate.FacingDown, Predicate.FacingLeft))
            }
        }
        if (playerCharacter.tileKindAt(TileDirection.Center, assets.tile`whee`) && runningUp == false) {
            if (playerCharacter.vx > 100 && playerCharacter.vy == 0) {
                runningUp = true
                playerCharacter.vy = playerCharacter.vx * -1
                playerCharacter.ay = 0
            } else if (playerCharacter.vy != 0) {
                flinging = true
                direction = -1
                playerCharacter.vx = playerCharacter.vy * -2
            }
        }
        if (playerCharacter.tileKindAt(TileDirection.Center, assets.tile`wheeLeft`) && runningUp == false) {
            if (playerCharacter.vx < -100 && playerCharacter.vy == 0) {
                runningUp = true
                playerCharacter.vy = playerCharacter.vx
                playerCharacter.ay = 0
            } else if (playerCharacter.vy != 0) {
                flinging = true
                direction = 1
                playerCharacter.vx = playerCharacter.vy * 2
            }
        }
    }
    for (let crateBehaviour of tiles.getTilesByType(assets.tile`myTile9`)) {
        if (tiles.tileAtLocationIsWall(tiles.getTileLocation(crateBehaviour.column, crateBehaviour.row)) && !(tiles.tileAtLocationIsWall(tiles.getTileLocation(crateBehaviour.column, crateBehaviour.row + 1)))) {
            tiles.setWallAt(tiles.getTileLocation(crateBehaviour.column, crateBehaviour.row), false)
            tiles.setTileAt(tiles.getTileLocation(crateBehaviour.column, crateBehaviour.row), assets.tile`transparency16`)
            cratefall = sprites.create(assets.image`Box`, SpriteKind.fallingCrate)
            cratefall.z = -2
            tiles.placeOnTile(cratefall, tiles.getTileLocation(crateBehaviour.column, crateBehaviour.row))
            cratefall.ay = 200
        }
    }
    for (let buggerBehaviour of sprites.allOfKind(SpriteKind.Enemy)) {
        if ((!(tiles.tileAtLocationIsWall(tiles.getTileLocation(buggerBehaviour.tilemapLocation().column - 1, buggerBehaviour.tilemapLocation().row + 1))) || tiles.tileAtLocationIsWall(tiles.getTileLocation(buggerBehaviour.tilemapLocation().column - 1, buggerBehaviour.tilemapLocation().row))) && sprites.readDataNumber(buggerBehaviour, "direction") == -1) {
            buggerBehaviour.vx = 20
            sprites.setDataNumber(buggerBehaviour, "direction", 1)
        } else if ((!(tiles.tileAtLocationIsWall(tiles.getTileLocation(buggerBehaviour.tilemapLocation().column + 1, buggerBehaviour.tilemapLocation().row + 1))) || tiles.tileAtLocationIsWall(tiles.getTileLocation(buggerBehaviour.tilemapLocation().column + 1, buggerBehaviour.tilemapLocation().row))) && sprites.readDataNumber(buggerBehaviour, "direction") == 1) {
            buggerBehaviour.vx = -20
            sprites.setDataNumber(buggerBehaviour, "direction", -1)
        }
    }
    for (let boxKiller of sprites.allOfKind(SpriteKind.boxDestroyer)) {
        boxDestroy(boxKiller, boxKiller.tilemapLocation())
        if (Math.abs(boxKiller.vx) != 400) {
            boxKiller.vx = sprites.readDataNumber(boxKiller, "boxDirection") * 400
        }
    }
    sprites.destroy(textSprite)
    sprites.destroy(textSprite2)
    if (!(spriteutils.isDestroyed(playerCharacter))) {
        textSprite = textsprite.create("" + health, 0, 15)
        textSprite.setOutline(1, 1)
        textSprite.setIcon(assets.image`health`)
        textSprite.setPosition(scene.cameraProperty(CameraProperty.X) - 96, scene.cameraProperty(CameraProperty.Y) - 62)
        textSprite.setFlag(SpriteFlag.Ghost, true)
        currentTime = Math.floor(game.runtime() * 0.001 - timeFromStart)
        textSprite2 = textsprite.create("" + currentTime, 0, 15)
        textSprite2.setOutline(1, 1)
        textSprite2.setIcon(assets.image`time`)
        if (currentTime < 10) {
            textSprite2.setPosition(scene.cameraProperty(CameraProperty.X) - 97, scene.cameraProperty(CameraProperty.Y) - 74)
        } else if (currentTime > 9 && currentTime < 100) {
            textSprite2.setPosition(scene.cameraProperty(CameraProperty.X) - 94, scene.cameraProperty(CameraProperty.Y) - 74)
        } else if (currentTime > 99) {
            textSprite2.setPosition(scene.cameraProperty(CameraProperty.X) - 91, scene.cameraProperty(CameraProperty.Y) - 74)
        }
        textSprite2.setFlag(SpriteFlag.Ghost, true)
    }
})
