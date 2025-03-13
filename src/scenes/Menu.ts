import { Scene } from 'phaser';
import { colors, font, size } from '../constants'

export class Menu extends Scene {
    constructor() {
        super('Menu');
    }

    createTitletext() {
        this.add.text(size.width / 2, size.height / 4, "Ghost Hero", {
            fontFamily: font,
            fontSize: '120px',
            color: colors.titleColor
        }).setOrigin(0.5);
    }

    createPlayButton() {
        const button = this.add.text(size.width / 2, size.height * (3 / 4), 'Play', {
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
            this.scene.stop('Menu');
            this.scene.launch('Game');
        })
    }

    create() {
        this.createTitletext();
        this.createPlayButton();
        
    }
}