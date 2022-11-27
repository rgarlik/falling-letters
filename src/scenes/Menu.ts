import Phaser from 'phaser';

import MenuButton from '../gameObjects/Menu/MenuButton';

/**
 * Menu is the main menu scene of the webapp, featuring a title and a 
 * button to start the game.
 */
export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        const canvas = this.sys.game.canvas;

        // Create animated title
        const title = this.add.text(canvas.width / 2, canvas.height / 2 - 100, 'Falling Letters',
            {
                fontFamily: 'RobotoMono',
                color: 'white',
                fontSize: '30px'
            }
        );
        title.setOrigin(0.5, 0.5);
        this.tweens.add({
            targets: title,
            scale: 0.8,
            duration: 1000,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });

        // Add subtext
        const subtext = this.add.text(canvas.width / 2, canvas.height / 2 - 70, 'Created by github.com/rgarlik',
            {
                fontFamily: 'RobotoMono',
                color: 'white',
                fontSize: '20px'
            }
        );
        subtext.setOrigin(0.5, 0.5);

        // Add play button
        new MenuButton(this, canvas.width / 2, canvas.height / 2 + 50, 'Play!', () => { this.playButtonClicked() } );
    }  

    // What happens when the play button is clicked
    private playButtonClicked() {
        this.scene.start('Game');
    }
}