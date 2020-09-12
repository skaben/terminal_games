import LoadingScreen from "../../components/loading";

import "../../../assets/styles/fonts.scss";
import './main.scss';

export default class Page {

  element;
  subElements = {};
  components = {};

  async initComponents() {
    const message = 'Duis nostrud pariatur duis do ullamco ad incididunt. Commodo amet minim sint eiusmod proident culpa voluptate. Mollit et consectetur adipisicing ut. Aute qui irure irure proident non dolor.';
    const screen = new LoadingScreen(message);

    this.components.loading = screen;
    return this.components;
  }

  get template () {
    return `
      <div class="page">
        <div class="content__loading" data-element="loading"></div>
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
