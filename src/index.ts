import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/Game';
import Menu from './scenes/Menu';
import Finish from './scenes/Finish';

// Start game after font was loaded

const font = new FontFace('RobotoMono', `url('/assets/RobotoMono-Medium.ttf')`);

font.load().then((loaded) => {
  document.fonts.add(loaded);
  new Phaser.Game(
    Object.assign(config, {
      scene: [Menu, GameScene, Finish]
    })
  );  
}).catch((err) => {
  return err;
})
