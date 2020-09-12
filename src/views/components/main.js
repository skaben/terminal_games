export default class Screen {

    constructor() {
      this.render();
    }

    get template() {
      return `
      `
    }

    render() {
      const element = document.createElement('div');
      element.innerHTML = this.template;
      this.element = element.firstElementChild;
      this.getSubElements(this.element);
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

    getSubElements() {
      const elements = element.querySelectorAll('[data-element]');

      return [...elements].reduce((accum, subElement) => {
        accum[subElement.dataset.element] = subElement;

        return accum;
      }, {});
    }
}
