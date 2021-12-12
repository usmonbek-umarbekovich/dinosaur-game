import { GROUND_WIDTH, SPEED } from '../config.js';
import customProperty from '../helpers/customProperty.js';

class Ground {
  #groundElems = document.querySelectorAll('[data-ground]');

  setup() {
    customProperty.set(this.#groundElems[0], '--left', 0);
    customProperty.set(this.#groundElems[1], '--left', GROUND_WIDTH);
  }

  update(delta, speedScale) {
    this.#groundElems.forEach(ground => {
      const incrementValue = delta * speedScale * SPEED * -1;
      customProperty.increment(ground, '--left', incrementValue);

      if (customProperty.get(ground, '--left') <= -GROUND_WIDTH) {
        customProperty.increment(ground, '--left', GROUND_WIDTH * 2);
      }
    });
  }
}

export default new Ground();
