import { Scene } from 'phaser';
import { size } from '../constants';
import { getRandomInt } from '../helper';

// Typing Aliases
type ImageWithDynamicBody = Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys | undefined;
type TimerEvent = Phaser.Time.TimerEvent;

// Constants
const ghostSpeed = 300;
const fireBallSpeed = 400;
const fireBallFireDelayMs = 250;
const playerStartingHealth = 3;

export class Game extends Scene {

    cursor: CursorKeys;
    player: ImageWithDynamicBody;
    fireBalls: ImageWithDynamicBody[];
    timer: TimerEvent;
    playerHealth: number;
    fireBallCounter: number;
    textHealth: Phaser.GameObjects.Text;
    textPoints: Phaser.GameObjects.Text;
    points: number;
    emitter: Phaser.GameObjects.Particles.ParticleEmitter;

    constructor() {
        super('Game');
    }

    preload() {
        this.load.setPath('assets');

        this.load.image('ghost', 'ghost.png');
        this.load.image('fireball', 'fireball.png');
    }

    gameOver() {
        this.player.setVisible(false);
        this.fireBalls.forEach(fb => fb.setVisible(false));
        this.scene.pause();
        this.scene.launch('Pause');
    }

    collision(object1: any, object2: any) {
        // Remove fireball image
        let idToRemove = (object2 as ImageWithDynamicBody).getData("id");
        this.fireBalls = this.fireBalls.filter(fireBall => fireBall.getData("id") !== idToRemove);
        (object2 as ImageWithDynamicBody).destroy(true);

        // Decrement health
        this.playerHealth -= 1;
        this.textHealth.setText(`Health: ${"❤️ ".repeat(this.playerHealth)}`);

        // Particle emitter
        this.emitter.start();

        // If we run out of health
        if (this.playerHealth <= 0) {
            this.gameOver();
        }
    }

    getAndIncFireballCounter() {
        let returnValue = this.fireBallCounter;
        this.fireBallCounter += 1;
        return returnValue;
    }

    createFireBall() {
        const randomInt = getRandomInt(4);

        const fireBall = this.physics.add.image(-50, -50, 'fireball')
            .setOrigin(0.5, 0.5)
            .setScale(0.3, 0.3);

        // Set direction of the fireball
        if (randomInt === 0) {
            // Down
            fireBall.setPosition(this.getRandomX(), -50)
                .setVelocityY(fireBallSpeed);
        } else if (randomInt === 1) {
            // Up
            fireBall.setPosition(this.getRandomX(), size.height + 50)
                .setVelocityY(-fireBallSpeed)
                .setRotation(Math.PI);
        } else if (randomInt === 2) {
            // Right
            fireBall.setPosition(-50, this.getRandomY())
                .setVelocityX(fireBallSpeed)
                .setRotation((3 * Math.PI) / 2);
        } else if (randomInt === 3) {
            // Left
            fireBall.setPosition(size.width + 50, this.getRandomY())
                .setVelocityX(-fireBallSpeed)
                .setRotation(Math.PI / 2);
        }


        fireBall.setData("id", this.getAndIncFireballCounter());

        this.physics.add.overlap(this.player, fireBall, this.collision, undefined, this);

        this.fireBalls.push(fireBall);
    }

    getRandomX() {
        return Math.floor(Math.random() * size.width);
    }

    getRandomY() {
        return Math.floor(Math.random() * size.height);
    }

    create() {
        // Class level variables
        this.fireBalls = [];
        this.playerHealth = playerStartingHealth;
        this.fireBallCounter = 1;
        this.points = 0;

        // Create player
        this.player = this.physics.add.image((size.width / 2), (size.height / 2), "ghost")
            .setOrigin(0.5, 0.5)
            .setScale(0.5, 0.5)
            .setCollideWorldBounds(true);

        // Setup keyboard
        this.cursor = this.input.keyboard?.createCursorKeys();

        // Setup timer for fireballs
        this.timer = this.time.addEvent({
            delay: fireBallFireDelayMs,
            callback: () => this.createFireBall(),
            //args: [],
            callbackScope: this,
            loop: true
        });
        
        this.textHealth = this.add.text(10, 10, `Health: ${"❤️ ".repeat(this.playerHealth)}`, {
            font: "25px Arial",
            color: "#000000"
        });

        this.textPoints = this.add.text(size.width - 150, 10, `Points: ${this.points}`, {
            font: "25px Arial",
            color: "#000000"
        });

        this.emitter = this.add.particles(0, 0, "fireball", {
            speed: 250,
            gravityY: 250,
            scale: 0.1,
            duration: 50,
            emitting: false,
            rotate: {
                onEmit: (particle) => {
                    return 0;
                },
                onUpdate: (particle) => {
                    return particle.angle + 2
                },
            },
        })
        this.emitter.startFollow(this.player, 0, 0, true);
    }

    handleUserInput() {
        if (!this.cursor) return;

        const { left, right, up, down } = this.cursor;

        if (left.isDown && right.isDown) {
            this.player.setVelocityX(0);
        } else if (left.isDown) {
            this.player.setVelocityX(-ghostSpeed);
        } else if (right.isDown) {
            this.player.setVelocityX(ghostSpeed);
        } else {
            this.player.setVelocityX(0);
        }

        if (up.isDown && down.isDown) {
            this.player.setVelocityY(0);
        } else if (up.isDown) {
            this.player.setVelocityY(-ghostSpeed);
        } else if (down.isDown) {
            this.player.setVelocityY(ghostSpeed);
        } else {
            this.player.setVelocityY(0);
        }
    }

    isFireBallOffScreen(fireBall: ImageWithDynamicBody): boolean {
        if (fireBall.x + fireBall.width / 2 < 0 || fireBall.x - fireBall.width / 2 > size.width) {
            return true;
        }
        if (fireBall.y + fireBall.height / 2 < 0 || fireBall.y - fireBall.height / 2 > size.height) {
            return true;
        }
        return false;
    }

    handleFireBallMovement() {
        if (this.fireBalls.length === 0) return;

        let onScreenFireBalls = this.fireBalls.filter(fireBall => !this.isFireBallOffScreen(fireBall));
        let offScreenFireBalls = this.fireBalls.filter(fireBall => this.isFireBallOffScreen(fireBall));
        offScreenFireBalls.forEach(fireBall => {
            fireBall.destroy(true);

            this.points += 1;
            this.textPoints.setText(`Points: ${this.points}`);
        });
        this.fireBalls = onScreenFireBalls;
    }

    update(): void {
        this.handleUserInput();
        this.handleFireBallMovement();
    }
}
