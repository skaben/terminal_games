const viewMixin = {

  element: null,
  subElements: {},

  show(target) {
    const parent = target || document.body;
    parent.append(this.element);
  },

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    this.subElements = [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
    return this.subElements;
  },

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template(this);
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(element);
    return this.element;
  },

  remove() {
    this.element.remove()
  }
}

export default viewMixin;
