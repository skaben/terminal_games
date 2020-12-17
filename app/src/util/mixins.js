//TODO: make page mixin, view mixin, document mixin

const viewMixin = superclass => class extends superclass {

  show(target) {
    const parent = target || document.body;
    parent.append(this.element);
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template(this);
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this) || {};
  }

  remove() {
    this.element.remove()
  }
}


export default class Page {

  data;
  element;
  subElements = {};
  components = {};

  initEventListeners = () => {};

  get template() {
    return `
      <div class="page">
        <div class="content__header" data-element="header"></div>
        <div class="content__main" data-element="main"></div>
        <div class="content__footer" data-element="footer"></div>
      </div>
    `;
  }

  async render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);

    await this.initComponents();
    this.initEventListeners();
    this.renderComponents();

    return this.element;
  }

  renderComponents() {
    Object.keys(this.components).forEach(component => {
      const root = this.subElements[component];
      this.components[component].show(root);
    });
  }

  getSubElements($element) {
    const elements = $element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();

    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}
