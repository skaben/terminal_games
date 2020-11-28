import "./style.scss";

export default class Menu {

  subElements = {};
  items = [];

  constructor(menuItems) {
    console.log(menuItems);
    this.items = menuItems;
    this.render();
  }

  get rows() {
    return this.items.map((item, index) => {
      const {name, href} = item;
      return `
        <div class="menu__item">
          <a href="${href}" data-element="link${index}" tabindex="${index + 1}">${name}</a>
        </div>
      `
    }).join('');
  }

  get template() {
    return `
      <div class="menu">
        ${this.rows}
      </div>
    `
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);

    const firstRow = this.subElements[Object.keys(this.subElements)[0]];
    firstRow.addEventListener("onfocus", event => console.log(event));
    firstRow.focus();

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
}
