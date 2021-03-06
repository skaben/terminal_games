import { viewMixin, canRender } from '../../../mixins/view';

class Timer {

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
    }

    template() {
      return `
        <div class="timer-bar">
          <div class="timer-bar__main">
            <span data-element="main">${this.message}</span>
            <span data-element="timer">${this.timer}</span>
          </div>
        </div>
      `
    }

    startTimer() {
      this.counter = setInterval(() => {
        if (this.timer > 0) {
          this.subElements.timer.textContent = --this.timer;
        } else {
          this.stopCounter();
        }
      }, 1000);
    }

    stopCounter() {
      this.subElements.timer.textContent = '';
      clearInterval(this.counter);
      if (this.onEnd) this.onEnd();
    }

}


const getTimer = (props) => {
  const timer = new Timer(props);
  Object.assign(
    timer,
    viewMixin,
    canRender
  )
  timer.render();
  timer.startTimer();
  return timer;
}

export default getTimer;
