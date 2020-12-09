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
      const {menu, href} = item;
      const link = href ? `/${href}` : 'javascript:;';
      return `
        <div class="menu__item">
          <a href="${link}" data-element="${index}" tabindex="${index + 1}">${menu}</a>
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
