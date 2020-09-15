import HackScreen from "../../components/hack";


export default class Page {

  element;
  subElements = {};
  components = {};

  async initComponents() {
    const screen = new HackScreen();

    this.components.hack = screen;
    return this.components;
  }

  get template () {
    return `
      <div class="page">
        <a href="/main"></a>
        <div class="content__hack" data-element="hack"></div>
      </div>
    `;
  }

  async render () {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);

    await this.initComponents();

    this.renderComponents();

    return this.element;
  }

  renderComponents () {
    Object.keys(this.components).forEach(component => {
      const root = this.subElements[component];
      const { element } = this.components[component];

      root.append(element);
    });
  }

  getSubElements ($element) {
    const elements = $element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  remove () {
    this.element.remove();
  }

  destroy () {
    this.remove();

    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}
