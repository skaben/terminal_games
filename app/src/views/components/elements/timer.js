export default class Timer {

    constructor() {
      this.message = message;
      this.barName = name;
      this.typeEffect = typeEffect;
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

      if (this.typeEffect) {this.assignTypeWriter()};

      return this.element;
    }

    get nav() {
      if (!this.navigation) return '';

      return Object.entries(this.navigation).map(entry => {
        const [text, link] = [...entry];
        return `<a href="${link}">${text}</a>`
      }).join('');
    }

    assignTypeWriter() {
      this.subElements.main.textContent = '';
      new TypeIt(this.subElements.main, {
        strings: [this.message,],
        cursor: false,
        speed: this.typeEffect.speed || 50,
        startDelay: this.typeEffect.delay || 0,
        loop: this.typeEffect.loop || false,
        afterComplete: this.typeEffect.callback,
      }).go();
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