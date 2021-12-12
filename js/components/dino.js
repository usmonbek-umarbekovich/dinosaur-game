import {
  GRAVITY,
  JUMP_SPEED,
  DINO_FRAME_COUNT,
  DINO_FRAME_TIME,
} from '../config.js';
import customProperty from '../helpers/customProperty.js';

class Dino {
  #dinoElem = document.querySelector('[data-dino]');
  #controller; // controller for event listeners
  #isJumping; // whether the dino is jumping
  #dinoFrame; // current dino frame
  #currentFrameTime;
  #yVelocity; // velocity on the y axis

  setup() {
    this.#isJumping = false;
    this.#dinoFrame = 0;
    this.#currentFrameTime = 0;
    this.#yVelocity = 0;
    customProperty.set(this.#dinoElem, '--bottom', 0);

    // abort the previous listener if there is any
    this.#controller?.abort();

    // add a new event listener with new abort controller
    this.#controller = new AbortController();
    document.addEventListener('keydown', this.#onJump.bind(this), {
      signal: this.#controller.signal,
    });
  }

  update(delta, speedScale) {
    this.#handleRun(delta, speedScale);
    this.#handleJump(delta);
  }

  getRect() {
    return this.#dinoElem.getBoundingClientRect();
  }

  setLose() {
    this.#dinoElem.src = 'img/dino-lose.png';
  }

  #handleRun(delta, speedScale) {
    if (this.#isJumping) {
      this.#dinoElem.src = 'img/dino-stationary.png';
      return;
    }

    if (this.#currentFrameTime >= DINO_FRAME_TIME) {
      this.#dinoFrame = (this.#dinoFrame + 1) % DINO_FRAME_COUNT;
      this.#dinoElem.src = `img/dino-run-${this.#dinoFrame}.png`;
      this.#currentFrameTime -= DINO_FRAME_TIME;
    }

    this.#currentFrameTime += delta * speedScale;
  }

  #handleJump(delta) {
    if (!this.#isJumping) return;

    const incrementValue = this.#yVelocity * delta;
    customProperty.increment(this.#dinoElem, '--bottom', incrementValue);

    if (customProperty.get(this.#dinoElem, '--bottom') <= 0) {
      customProperty.set(this.#dinoElem, '--bottom', 0);
      this.#isJumping = false;
    }

    this.#yVelocity -= GRAVITY * delta;
  }

  #onJump(e) {
    if (e.code !== 'Space' || this.#isJumping) return;

    this.#yVelocity = JUMP_SPEED;
    this.#isJumping = true;
  }
}

export default new Dino();
