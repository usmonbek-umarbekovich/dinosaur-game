import ground from './components/ground.js';
import dino from './components/dino.js';
import cactus from './components/cactus.js';
import game from './components/game.js';

const startScreenElem = document.querySelector('[data-start-screen]');

let lastTime;

document.addEventListener('keydown', handleStart, {
  once: true,
});

function handleStart() {
  // initialize the values
  lastTime = null;
  game.speedScale = 1;
  game.score = 0;

  // initialize the components
  ground.setup();
  dino.setup();
  cactus.setup();

  // start the game
  startScreenElem.classList.add('hide');
  window.requestAnimationFrame(gameCycle);
}

function gameCycle(time) {
  // if it is being called for the first time
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(gameCycle);
    return;
  }

  // get the time difference between the frames
  const delta = time - lastTime;

  // update components
  ground.update(delta, game.speedScale);
  dino.update(delta, game.speedScale);
  cactus.update(delta, game.speedScale);

  // increase the speed and score as the time pass
  game.updateSpeedScale(delta);
  game.updateScore(delta);

  // If user lost, end the game
  if (game.checkLose()) return handleLose();

  // continue the game
  lastTime = time;
  window.requestAnimationFrame(gameCycle);
}

function handleLose() {
  dino.setLose();

  // wait 100ms to be able to start the game again
  setTimeout(() => {
    document.addEventListener('keydown', handleStart, {
      once: true,
    });
  }, 100);

  startScreenElem.classList.remove('hide');
}
