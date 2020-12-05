export default class TextBar {

    constructor(name,
                message,
                navigation) {
      this.message = message || "!! terminal configuration failed, call system administator !!";
      this.barName = name;
      this.navigation = navigation;
      this.render();
    }

    get template() {
      return `
        <div class="${this.barName}">
          <div class="${this.barName}__main" data-element="main">${this.message}</div>
          <div class="${this.barName}__nav" data-element="nav">${this.nav}</div>
        </div>
      `
    }

    render() {
      const element = document.createElement('div');
      element.innerHTML = this.template;
      this.subElements = this.getSubElements(element);
      this.element = element.firstElementChild;

      return this.element;
    }

    get nav() {
      if (!this.navigation) return '';

      return Object.entries(this.navigation).map(entry => {
        const [text, link] = [...entry];
        return `<a href="${link}">${text}</a>`
      }).join('');
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
