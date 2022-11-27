import Phaser from 'phaser';
import FallingLetter from '../gameObjects/Game/FallingLetter';
import { FinishSceneData } from './Finish';

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

  public mapOfLetters : Map<string, FallingLetter[]>;

  /**
   * The score multiplier for a gold letter
   */
  readonly GOLD_LETTER_PRICE : number = 3;

  /**
   * The player's current score
   */
  public get score() : number {
    return this._normalLettersCaptured + (this._goldenLettersCaptured * this.GOLD_LETTER_PRICE);
  }

  /**
   * How many regular letters the player captured
   */
  public set normalLettersCaptured(newScore: number) {
    this._normalLettersCaptured = newScore;

    if(this._scoreText) {
      this._scoreText.text = String(this.score);
    }
  }

  public get normalLettersCaptured() {
    return this._normalLettersCaptured;
  }

  /**
   * How many gold letters the player captured
   */
  public set goldenLettersCaptured(newScore: number) {
    this._goldenLettersCaptured = newScore;

    if(this._scoreText) {
      this._scoreText.text = String(this.score);
    }
  }

  public get goldenLettersCaptured() {
    return this._goldenLettersCaptured;
  }

  private _normalLettersCaptured : number = 0;
  private _goldenLettersCaptured : number = 0;

  // Time
  private _timeLeft: number = 0;
  private _timeLeftText?: Phaser.GameObjects.Text;
  private _highPrecisionTimer: number = 0;

  /**
   * The time in game that's left (in seconds)
   */
  public get timeLeft() {
    return this._timeLeft;
  }

  public set timeLeft(setTime: number) {
    this._timeLeft = setTime;
    if(this._timeLeftText) {
      this._timeLeftText.text = String(setTime);
    }
  }

  // Letter spawning
  private _letterSpawnTimer: number = 0;
  
  /**
   * The rate at which letters spawn (in seconds)
   */
  public letterSpawnRate: number = 250;
  
  constructor() {
    super('Game');
    this.mapOfLetters = new Map<string, FallingLetter[]>();
  }

  create() {
    const canvas = this.sys.game.canvas;

    // Enable input
    this.input.enabled = true;

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
    this._highPrecisionTimer = 0;

    // Initial display of the score
    if(this._scoreText) {
      this._scoreText.text = String(this.score);
    }

    // Create keyboard event
    this.input.keyboard.on('keydown', (event: KeyboardEvent) => {this._handleKeyEvent(event)});
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
      const finishSceneData : FinishSceneData = {
        totalScore: this.score,
        capturedLetters: this.normalLettersCaptured,
        capturedGoldLetters: this.goldenLettersCaptured
      }
      this.scene.start('Finish', finishSceneData);
    }

    // Spawn letters
    this._letterSpawnTimer += delta;
    if(this._letterSpawnTimer >= this.letterSpawnRate) {
      this._letterSpawnTimer = 0;
      const newLetter = new FallingLetter(this);

      // Add new letter to map of letters
      if(this.mapOfLetters.has(newLetter.letter)) {
        this.mapOfLetters.get(newLetter.letter)?.push(newLetter);
      } else {
        this.mapOfLetters.set(newLetter.letter, [ newLetter ]);
      }
      
    }
  }

  /**
   * Fires every time a key is pressed
   */
  private _handleKeyEvent(event: KeyboardEvent) : void { 
    // If there is a letter like that on-screen
    if( Array.from(this.mapOfLetters.keys()).includes(event.key.toUpperCase()) ) {
      // ..capture those letters
      this.mapOfLetters.get(event.key.toUpperCase())?.forEach(
        letter => letter.captured()
      );
    }

    // Delete letters from map
    this.mapOfLetters.delete(event.key.toUpperCase());
  }
}
