namespace SpriteKind {
    export const Show = SpriteKind.create()
    export const fallingCrate = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile8`)
    projectile = sprites.createProjectileFromSprite(assets.image`POW`, playerCharacter, 0, 0)
    projectile.ax = 400
    music.play(music.createSoundEffect(WaveShape.Noise, 1162, 1607, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    projectile.setFlag(SpriteFlag.AutoDestroy, false)
    projectile.setFlag(SpriteFlag.DestroyOnWall, true)
    poofs(projectile, false, 4)
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (playerCharacter.isHittingTile(CollisionDirection.Left) || playerCharacter.isHittingTile(CollisionDirection.Right)) {
        if (tiles.tileAtLocationEquals(location, assets.tile`myTile9`) && Math.abs(playerCharacter.vx) > 100) {
            tiles.setWallAt(location, false)
            tiles.setTileAt(location, assets.tile`transparency16`)
            playerCharacter.vx = direction * 100
            Crate = sprites.create(assets.image`Box`, SpriteKind.Show)
            animation.runImageAnimation(
            Crate,
            assets.animation`BoxFly`,
            50,
            true
            )
            music.play(music.createSoundEffect(WaveShape.Noise, 523, 521, 255, 0, 595, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            scene.cameraShake(2, 500)
            tiles.placeOnTile(Crate, location)
            Crate.vx = direction * 400
            Crate.vy = -90
            Crate.setFlag(SpriteFlag.AutoDestroy, true)
            Crate.setFlag(SpriteFlag.GhostThroughWalls, true)
        }
    }
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        invincible = false
        flinging = false
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
    for (let Frame = 0; Frame <= anim.length - 1; Frame++) {
        tempImage = anim[Frame]
        tempImage.replace(1, 2)
        tempList.push(tempImage)
    }
    return tempList
}
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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (playerControl == true) {
        if (runningUp == false) {
            if (playerCharacter.vy == 0) {
                playerCharacter.vy = -125
                music.play(music.createSoundEffect(WaveShape.Square, 622, 1295, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            }
        } else {
            music.play(music.createSoundEffect(WaveShape.Square, 744, 1565, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            runningUp = false
            playerCharacter.ay = 400
            playerCharacter.vx = direction * -100
        }
    }
})
scene.onHitWall(SpriteKind.fallingCrate, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        tiles.setTileAt(tiles.getTileLocation(location.column, location.row - 1), assets.tile`myTile9`)
        tiles.setWallAt(tiles.getTileLocation(location.column, location.row - 1), true)
        sprites.destroy(sprite)
    }
})
info.onLifeZero(function () {
    playerControl = false
    characterAnimations.setCharacterAnimationsEnabled(playerCharacter, false)
    characterAnimations.clearCharacterState(playerCharacter)
    animation.runImageAnimation(
    playerCharacter,
    assets.animation`Player_Dead`,
    200,
    false
    )
    scene.cameraFollowSprite(null)
    playerCharacter.vx = 0
    playerCharacter.vy = -200
    playerCharacter.setFlag(SpriteFlag.AutoDestroy, true)
    playerCharacter.setFlag(SpriteFlag.GhostThroughWalls, true)
    timer.after(2500, function () {
        game.reset()
    })
})
function poofs (sprite: Sprite, expoldeTrue: boolean, amount: number) {
    for (let index = 0; index < amount; index++) {
        timer.after(randint(0, 200), function () {
            poofPoof = sprites.create(assets.image`pof`, SpriteKind.Show)
            poofPoof.setPosition(sprite.x + randint(-8, 8), sprite.y + randint(-8, 8))
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
    poofs(sprite, true, 4)
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
                    assets.animation`bugSQUICH`,
                    200,
                    false
                    )
                } else {
                    animation.runImageAnimation(
                    otherSprite,
                    createFlipped(assets.animation`bugSQUICH`),
                    200,
                    false
                    )
                }
                timer.after(500, function () {
                    poofs(otherSprite, true, 4)
                    sprites.destroy(otherSprite)
                })
            } else {
                invincible = true
                flinging = true
                sprite.vx = sprite.vx + direction * -200
                sprite.vy = -75
                info.changeLifeBy(-1)
            }
        }
    }
})
let cratefall: Sprite = null
let location: tiles.Location = null
let poofPoof: Sprite = null
let runningUp = false
let crawlerLeft: Image[] = []
let crawlerRight: Image[] = []
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
let tempImage: Image = null
let tempList: Image[] = []
let Crate: Sprite = null
let projectile: Sprite = null
let groundbug: Sprite = null
let invincible = false
let flinging = false
let direction = 0
let playerCharacter: Sprite = null
let playerControl = false
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 240
    export const ARCADE_SCREEN_HEIGHT = 160
}
spriteutils.setLifeImage(assets.image`life`)
info.setLife(4)
playerControl = true
playerCharacter = sprites.create(assets.image`Player_Idle_image`, SpriteKind.Player)
scene.setBackgroundColor(8)
direction = 1
tiles.setCurrentTilemap(tilemap`level1`)
playerCharacter.ay = 400
scene.cameraFollowSprite(playerCharacter)
tiles.placeOnTile(playerCharacter, tiles.getTileLocation(47, 0))
tiles.placeOnTile(playerCharacter, tiles.getTileLocation(0, 13))
flinging = false
invincible = false
for (let grounders of tiles.getTilesByType(assets.tile`myTile16`)) {
    groundbug = sprites.create(assets.image`Box`, SpriteKind.Enemy)
    sprites.setDataNumber(groundbug, "direction", -1)
    groundbug.vx = -20
    tiles.placeOnTile(groundbug, grounders)
    tiles.setTileAt(grounders, assets.tile`transparency16`)
}
setupAnim()
timer.background(function () {
    music.play(music.createSong(assets.song`PV intro`), music.PlaybackMode.UntilDone)
    music.play(music.createSong(assets.song`Pitfell Valley`), music.PlaybackMode.LoopingInBackground)
})
if (false) {
    timer.background(function () {
        music.play(music.createSong(assets.song`AP intro`), music.PlaybackMode.UntilDone)
        music.play(music.createSong(assets.song`Argon Peaks`), music.PlaybackMode.LoopingInBackground)
    })
}
game.onUpdate(function () {
    if (playerControl == true) {
        if (invincible == false) {
            if (controller.right.isPressed()) {
                if (!(controller.down.isPressed())) {
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
                if (!(controller.down.isPressed())) {
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
                    if (controller.down.isPressed()) {
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
        if (playerCharacter.tileKindAt(TileDirection.Center, assets.tile`wheeLEft`) && runningUp == false) {
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
})
