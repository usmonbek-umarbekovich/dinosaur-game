import { CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX, SPEED } from '../config.js';
import customProperty from '../helpers/customProperty.js';

class Cactus {
  #worldElem = document.querySelector('[data-world]');
  #nextCactusTime;

  setup() {
    this.#nextCactusTime = CACTUS_INTERVAL_MIN;
    const cactusElements = document.querySelectorAll('[data-cactus]');

    cactusElements.forEach(cactus => {
      cactus.remove();
    });
  }

  update(delta, speedScale) {
    const cactusElements = document.querySelectorAll('[data-cactus]');

    const incrementValue = delta * speedScale * SPEED * -1;
    cactusElements.forEach(cactus => {
      customProperty.increment(cactus, '--left', incrementValue);

      if (customProperty.get(cactus, '--left') <= -100) {
        cactus.remove();
      }
    });

    if (this.#nextCactusTime <= 0) {
      this.#createCactus();
      this.#nextCactusTime =
        this.#randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) /
        speedScale;
    }

    this.#nextCactusTime -= delta;
  }

  getRects() {
    const cactusElements = document.querySelectorAll('[data-cactus]');
    return [...cactusElements].map(cactus => cactus.getBoundingClientRect());
  }

  #createCactus() {
    const cactus = document.createElement('img');
    cactus.dataset.cactus = true;
    cactus.src = '../img/cactus.png';
    cactus.classList.add('cactus');
    customProperty.set(cactus, '--left', 100);
    this.#worldElem.append(cactus);
  }

  #randomNumberBetween(min, max) {
    const randomNumber = Math.random() * (max - min + 1) + min;
    return Math.floor(randomNumber);
  }
}

export default new Cactus();
