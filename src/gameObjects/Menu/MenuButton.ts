/**
 * A button clickable in the main menu
 */
export default class MenuButton extends Phaser.GameObjects.Text {
    constructor(scene: Phaser.Scene, x: number, y: number, text: string, onclick: Function) {
        const canvas = scene.sys.game.canvas;

        // Create button
        super(scene, x, y, text,
        {
            fontFamily: 'RobotoMono',
            color: 'yellow',
            fontSize: '20px'
        });
        this.setOrigin(0.5, 0.5);
        
        // Interactivity
        this.setInteractive();

        this.on('pointerover', () => {
            this.setStyle({
                fill: '#ff0000'
            });
        });

        this.on('pointerdown', () => {
            this.setStyle({
                fill: '#930000'
            });
        });

        this.on('pointerout', () => {
            this.setStyle({
                fill: 'yellow'
            });
        });

        this.on('pointerup', () => {
            this.setStyle({
                fill: '#ff0000'
            });
            onclick();
        });

        // Add itself to the scene
        scene.add.existing(this);
    }
}