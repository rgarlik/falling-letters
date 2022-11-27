/**
 * A scene that appears after a game is over, showing the
 * player their score
 */
export default class Finish extends Phaser.Scene {
    constructor() {
        super('Finish');
    }

    create(data: FinishSceneData) {
        const canvas = this.sys.game.canvas;

        // Create animated title
        const timesUpLabel = this.add.text(canvas.width / 2, canvas.height / 2 - 50, 'Time\'s up!',
            {
                fontFamily: 'RobotoMono',
                color: '#fcff7e',
                fontSize: '20px'
            }
        );
        timesUpLabel.setOrigin(0.5, 0.5);

        const totalScore = this.add.text(canvas.width / 2, canvas.height / 2, String(data.totalScore),
            {
                fontFamily: 'RobotoMono',
                color: 'white',
                fontSize: '25px'
            }
        );
        totalScore.setOrigin(0.5, 0.5);

        const totalScoreLabel = this.add.text(canvas.width / 2, canvas.height / 2 + 30, 'Total score',
            {
                fontFamily: 'RobotoMono',
                color: 'white',
                fontSize: '15px'
            }
        );
        totalScoreLabel.setOrigin(0.5, 0.5);

        const capturedLetters = this.add.text(canvas.width / 2 - 50, canvas.height / 2 + 80, String(data.capturedLetters),
            {
                fontFamily: 'RobotoMono',
                color: 'white',
                fontSize: '25px'
            }
        );
        capturedLetters.setOrigin(0.5, 0.5);

        const capturedLettersLabel = this.add.text(canvas.width / 2 - 50, canvas.height / 2 + 110, 'Letters',
            {
                fontFamily: 'RobotoMono',
                color: 'white',
                fontSize: '15px'
            }
        );
        capturedLettersLabel.setOrigin(0.5, 0.5);

        const plusLabel = this.add.text(canvas.width / 2, canvas.height / 2 + 80, '+',
            {
                fontFamily: 'RobotoMono',
                color: 'white',
                fontSize: '25px'
            }
        );
        plusLabel.setOrigin(0.5, 0.5);

        const capturedGoldLetters = this.add.text(canvas.width / 2 + 50, canvas.height / 2 + 80, String(data.capturedGoldLetters),
            {
                fontFamily: 'RobotoMono',
                color: '#fcff7e',
                fontSize: '25px'
            }
        );
        capturedGoldLetters.setOrigin(0.5, 0.5);

        const capturedGoldLettersLabel = this.add.text(canvas.width / 2 + 50, canvas.height / 2 + 110, 'Gold',
            {
                fontFamily: 'RobotoMono',
                color: '#fcff7e',
                fontSize: '15px'
            }
        );
        capturedGoldLettersLabel.setOrigin(0.5, 0.5);

        const x3Label = this.add.text(canvas.width / 2 + 80, canvas.height / 2 + 85, 'x3',
            {
                fontFamily: 'RobotoMono',
                color: '#fcff7e',
                fontSize: '15px'
            }
        );
        x3Label.setOrigin(0.5, 0.5);
    }
}

/**
 * Finish scene data structure
 */
export type FinishSceneData = { 
    capturedLetters : number,
    capturedGoldLetters: number,
    totalScore: number
}