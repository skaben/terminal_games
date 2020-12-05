export default class Timer {

    counter;
    element;
    subElements;

    constructor({
      timer,
      message,
      onEnd
    } = props) {
      this.timer = timer || 0;
      this.message = message || '';
      this.onEnd = onEnd;
      this.render();
    }

    get template() {
      return `
        <div class="timer-bar">
          <div class="timer-bar__main">
            <span data-element="main">${this.message}</span>
            <span data-element="time"></span>
          </div>
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
      if (!this.timer) return '';

      return Object.entries(this.navigation).map(entry => {
        const [text, link] = [...entry];
        return `<a href="${link}">${text}</a>`
      }).join('');
    }

    startTimer() {
      this.counter = setInterval(() => {
        if (this.timer > 0) {
          this.subElements.time.textContent = --this.timer;
          console.log(`tick ${this.timer}`);
        } else {
          this.stopCounter();
        }
      }, 1000);
    }

    stopCounter() {
      console.log('finish!');
      this.subElements.time.textContent = '';
      clearInterval(this.counter);
      if (this.onEnd) this.onEnd();
    }

    show(target) {
      const parent = target || document.body;
      if (this.timer > 0) this.startTimer();
      parent.append(this.element);
    }

    remove() {
      this.element.remove()
      clearInterval(this.counter);
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
