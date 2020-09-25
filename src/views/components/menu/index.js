import "./style.scss";

export default class Menu {

  subElements = {};
  items = [];

  testItems = [
    ["main", "test show loading screen"],
    ["hack", "test gain access by hack"],
    ["menu", "test return to main menu"]
  ];

  constructor(itemArray) {
    this.items = itemArray || this.testItems;
    this.render();
  }

  get rows() {
    return this.items.map(item => {
      const [href, name] = [...item];
      return `
        <div class="menu__item">
          <a href="${href}" data-element="link${href}">${name}</a>
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