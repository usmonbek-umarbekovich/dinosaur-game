import { WORLD_WIDTH, WORLD_HEIGHT, SPEED_SCALE_INCREASE } from '../config.js';
import dino from './dino.js';
import cactus from './cactus.js';

class Game {
  #worldElem = document.querySelector('[data-world]');
  #scoreElem = document.querySelector('[data-score]');
  #speedScale;
  #score;

  constructor() {
    this.#setPixelToWorldScale();
    window.addEventListener('resize', this.#setPixelToWorldScale.bind(this));
  }

  get speedScale() {
    return this.#speedScale;
  }

  set speedScale(newSpeedScale) {
    this.#speedScale = newSpeedScale;
  }

  get score() {
    return this.#score;
  }

  set score(newScore) {
    this.#score = newScore;
  }

  updateSpeedScale(delta) {
    this.#speedScale += delta * SPEED_SCALE_INCREASE;
  }

  updateScore(delta) {
    this.#score += delta * 0.01;
    this.#scoreElem.textContent = Math.floor(this.#score);
  }

  checkLose() {
    const dinoRect = dino.getRect();
    const cactusRects = cactus.getRects();
    return cactusRects.some(rect => this.#isCollision(rect, dinoRect));
  }

  #isCollision(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.top < rect2.bottom &&
      rect1.right > rect2.left &&
      rect1.bottom > rect2.top
    );
  }

  #setPixelToWorldScale() {
    let worldToPixelScale;
    const windowRatio = window.innerWidth / window.innerHeight;
    const worldRatio = WORLD_WIDTH / WORLD_HEIGHT;
    if (windowRatio < worldRatio) {
      worldToPixelScale = window.innerWidth / WORLD_WIDTH;
    } else {
      worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
    }

    this.#worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
    this.#worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
  }
}

export default new Game();
