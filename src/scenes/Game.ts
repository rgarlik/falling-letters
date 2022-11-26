import Phaser from 'phaser';

/**
 * The game scene itself. Numbers fall from the top part of the screen,
 * the player needs to type them out in order to get score.
 * 
 * Previous score and difficulty can be configured by data being passed to the scene
 */
export default class Game extends Phaser.Scene {
  // Score
  private _score: number = 0;
  private _scoreText?: Phaser.GameObjects.Text;

  public get score() {
    return this._score;
  }

  public set score(setScore: number) {
    this._score = setScore;
    if(this._scoreText) {
      this._scoreText.text = String(setScore);
    }
  }

  // Time
  private _timeLeft: number = 0;
  private _timeLeftText?: Phaser.GameObjects.Text;
  private _highPrecisionTimer: number = 0;

  public get timeLeft() {
    return this._timeLeft;
  }

  public set timeLeft(setTime: number) {
    this._timeLeft = setTime;
    if(this._timeLeftText) {
      this._timeLeftText.text = String(setTime);
    }
  }
  
  constructor() {
    super('Game');
  }

  create() {
    const canvas = this.sys.game.canvas;

    // Bottom scoreboard
    this.add.rectangle(0, canvas.height - 40, canvas.width * 2, 80 , 0x646464);

    // Labels
    this.add.text(0, canvas.height - 40, 'Score',
        {
            fontFamily: 'RobotoMono',
            color: '#a6a6a6',
            fontSize: '20px'
        }
    ).setOrigin(-0.25, 0.5);
    this.add.text(canvas.width, canvas.height - 40, 'Time',
        {
            fontFamily: 'RobotoMono',
            color: '#a6a6a6',
            fontSize: '20px'
        }
    ).setOrigin(1.50, 0.5);
    this.add.text(canvas.width / 2, canvas.height - 40, 'Type the letters as they fall!',
        {
            fontFamily: 'RobotoMono',
            color: '#a6a6a6',
            fontSize: '20px'
        }
    ).setOrigin(0.5, 0.5);

    // Score keepers
    this._scoreText = this.add.text(45, canvas.height - 80, 'x',
        {
            fontFamily: 'RobotoMono',
            color: '#d6d6d6',
            fontSize: '50px',
            backgroundColor: '#646464'
        }
    ).setOrigin(0.5, 0.5);

    this._timeLeftText = this.add.text(canvas.width - 45, canvas.height - 80, 'x',
        {
            fontFamily: 'RobotoMono',
            color: '#d6d6d6',
            fontSize: '50px',
            backgroundColor: '#646464'
        }
    ).setOrigin(0.5, 0.5);

    // Prepare score and time
    this.timeLeft = 20;
    this.score = 0;
    this._highPrecisionTimer = 0;
  }

  update(time: number, delta: number) {
    // Count seconds
    this._highPrecisionTimer += delta;
    if(this._highPrecisionTimer >= 1000) {
      this.timeLeft--;
      this._highPrecisionTimer = 0;
    }

    // End game when timer reaches zero
    if(this.timeLeft == 0) {
      // end game
    }
  }
}
