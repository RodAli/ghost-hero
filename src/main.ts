import { Menu } from './scenes/Menu';
import { Game as MainGame } from './scenes/Game';
import { Pause } from './scenes/Pause';
import { AUTO, Game, Scale,Types } from 'phaser';
import { size } from './constants';
import { colors } from './constants';

const config: Types.Core.GameConfig = {
    type: AUTO,
    width: size.width,
    height: size.height,
    parent: 'game-container',
    backgroundColor: colors.backgroundColor,
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        Menu,
        MainGame,
        Pause
    ]
};

export default new Game(config);
