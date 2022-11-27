import Game from "../../scenes/Game";

/**
 * A letter falling in-game complete with input handling
 */
 export default class FallingLetter extends Phaser.GameObjects.Text {
    // This randomly generated letter in string form
    public letter : string;

    // Speed of the letter falling down
    public speed : number;

    // Is this a golden letter?
    public golden : boolean;

    // An animation tween that exists for golden letters
    private _zigZagTween? : Phaser.Tweens.Tween;

    // This game's canvas
    private _canvas : HTMLCanvasElement;

    // The game scene
    private _gameScene: Game;

    constructor(scene: Game) {
        const canvas = scene.sys.game.canvas;

        // Create a random letter on the top of the screen
        super(scene, Math.random() * canvas.width, 0, '0',
        {
            fontFamily: 'RobotoMono',
            color: '#d6d6d6',
            fontSize: '50px',
            backgroundColor: '#646464'
        }
        );

        this._canvas = canvas;
        this._gameScene = scene;

        // Select letter
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.letter = letters.charAt(Math.floor(Math.random() * letters.length));
        this.text = this.letter;

        // Set random speed
        this.speed = 1 + Math.random() * 3;

        // One in 10 letters is golden and worth more points
        this.golden = Math.floor(Math.random() * 10) == 0 ? true : false;
        if(this.golden) {
            this.style.setColor('#e7ff00');
            this.style.setBackgroundColor('#7a8600');
            this.speed = 2;
            // add a slight zig zag motion to make letter harder to read
            this._zigZagTween = scene.tweens.add({
                targets: this,
                x: 20, // this causes the letters to zig zag at different rates based on their initial x position, this is a "bug" but I'm leaving it in on purpose cause it looks cool
                duration: 500,
                ease: 'Sine.inOut',
                yoyo: true,
                repeat: -1
            });
        }

        // Make letters behind the rest of UI on the Z axis
        this.depth = -1;

        // Attach to scene
        scene.add.existing(this);
    }

    preUpdate(delta: number, time: number) {
        // Make the letter fall down
        this.setPosition(this.x, this.y + this.speed, -1);

        // Destroy if beyond bounds of the screen
        if(this.y > this._canvas.height - 70) {
            this._cleanup();
            // Remove this object from the map
            const index = this._gameScene.mapOfLetters.get(this.letter)?.indexOf(this);
            if(index !== undefined) {
                this._gameScene.mapOfLetters.get(this.letter)?.splice(index, 1);
            }
            this.destroy();
        }
    }

    /**
     * Called whenever the key was
     * correctly typed
     */
    public captured() {
        // Stop the letter from falling as it's disappearing
        this.speed = 0;

        this._cleanup();

        this.setColor('red');
        this.setBackgroundColor('transparent');

        if(this.golden) {
            this._gameScene.goldenLettersCaptured++;
        } else {
            this._gameScene.normalLettersCaptured++;
        }

        // add an animation for the disappearing key
        this._gameScene.tweens.add({
            targets: this,
            alpha: 0,
            duration: 500,
            ease: 'Sine.inOut',
            yoyo: false,
            repeat: 0
        }).setCallback('onComplete', () => {this.destroy()}, ['something']); //TODO: find a way to bypass `callback params is undefined` error without passing parameters
    }

    /**
     * Remove all data this object left on the game scene
     */
    private _cleanup() {
        // Remove the zig zag tween if there is one
        if(this._zigZagTween) {
            this._gameScene.tweens.remove(this._zigZagTween);
        }
    }
}