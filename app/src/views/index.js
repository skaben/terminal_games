class viewMixin {

  element;
  subElements = {};

  show = (target) => {
    const parent = target || document.body;
    parent.append(this.element);
  }

  getSubElements = (element) => {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  render = () => {
    const element = document.createElement('div');
    element.innerHTML = this.template(this);
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this) || {};
  }

  remove = () => {
    this.element.remove()
  }
}

