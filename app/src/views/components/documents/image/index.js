import './style.scss';

import View from '../../../../util/mixins';
import TextBar from '../../elements/textbar';
import Timer from '../../elements/timer';
//TODO: iamge not found
export default class ImageDoc {

  components = {};
  nav = {"back": "/back"};

  constructor({
    name,
    data,
    timer
  } = {}) {

    if (timer && timer > 0) {
      this.nav = {};
      this.components['footer'] = new Timer({timer: timer, message: 'document blocked... '});
    }

    this.components['header'] = new TextBar("header", `image document ${name}` || '', this.nav);
    this.data = data;
    this.render();
  }

  get template() {
    return `
      <div class="image-page">
        <div class="content__header" data-element="header"></div>
        <div class="content__main" data-element="main">
          <div class="image-wrapper">
            <div class="image-content" style="background-image: url(/asset/images/${this.image});"></div>
          </div>
        </div>
        <div class="content__footer" data-element="footer"></div>
      </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.subElements = this.getSubElements(element);
    this.renderComponents();
    this.element = element.firstElementChild;

    return this.element;
  }

  show(target) {
    const parent = target || document.body;
    parent.append(this.element);
  }

  remove() {
    this.element.remove()
  }

  destroy() {
    this.remove();
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  renderComponents () {
    Object.keys(this.components).forEach(component => {
      const root = this.subElements[component];
      this.components[component].show(root);
    });
  }

}
