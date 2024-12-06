import { size } from '../constants';

export class Pause extends Phaser.Scene {
    constructor() {
        super('Pause');
    }

    create() {
        this.add.text(size.width / 2, size.height / 3, "Game over!", {
            font: "100px Arial",
            color: "#000000"
        }).setOrigin(0.5, 0.5);
        this.add.text(size.width / 2, (size.height / 3) * 2, "Press Enter key to restart", {
            font: "50px Arial",
            color: "#000000"
        }).setOrigin(0.5, 0.5);
        
        // Add Enter key handler to resume the game
        this.input.keyboard?.on('keydown-ENTER', () => {
            this.scene.stop('Pause');
            this.scene.launch('Game');
        });
    }
}