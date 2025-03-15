import { colors, font, size } from '../constants';

export class Pause extends Phaser.Scene {
    constructor() {
        super('Pause');
    }

    createTitleText() {
        this.add.text(size.width / 2, size.height / 4, "Game over!", {
            fontFamily: font,
            fontSize: "100px",
            color: "#000000"
        }).setOrigin(0.5);
    }

    createPromptText() {
        this.add.text(size.width / 2, size.height / 2, "Press Enter or Space key to restart", {
            font: "50px Arial",
            color: "#000000"
        }).setOrigin(0.5);
    }

    setupKeyHandlers() {
        
        const handler = () => {
            this.scene.stop('Pause');
            this.scene.launch('Game');
        }
        this.input.keyboard?.on('keydown-ENTER', handler);
        this.input.keyboard?.on('keydown-SPACE', handler);
    }

    createMainMenuButton() {
        const button = this.add.text(size.width / 2, size.height * (3 / 4), 'Main Menu', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center',
            fixedWidth: 260,
            backgroundColor: colors.buttonColor,
        }).setPadding(32).setOrigin(0.5);

        button.setInteractive({ useHandCursor: true });

        button.on('pointerover', () => {
            button.setBackgroundColor(colors.buttonColorHover);
        });

        button.on('pointerout', () => {
            button.setBackgroundColor(colors.buttonColor);
        });

        button.on("pointerdown", () => {
            this.scene.stop('Pause');
            this.scene.launch('Menu');
        })
    }

    create() {
        this.createTitleText();
        this.createPromptText();
        this.createMainMenuButton();
        this.setupKeyHandlers();
    }
}