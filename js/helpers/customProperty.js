class CustomProperty {
  get(elem, prop) {
    const rawPropertyValue = getComputedStyle(elem).getPropertyValue(prop);
    return parseFloat(rawPropertyValue) || 0;
  }

  set(elem, prop, value) {
    elem.style.setProperty(prop, value);
  }

  increment(elem, prop, value) {
    const propValue = this.get(elem, prop);
    this.set(elem, prop, propValue + value);
  }
}

export default new CustomProperty();
