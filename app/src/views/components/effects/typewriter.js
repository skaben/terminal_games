import { renderDelay } from "../../../router/render-page";

export default class TypeWriter {

  punctuation = "[.,\/#!$%\^&\*;:{}=\-_`~()]".split('');
  overall;
  totalTime;
  spedUp = 1;

  constructor(target, {
    text,
    name = 'typewriter',
    speed = 25,
    delay = renderDelay,
    onComplete
  } = {}) {
    this.name = name;
    this.speed = speed;
    this.delay = delay;
    this.onComplete = onComplete;
    this.target = target;
    this.content = this.initialize(text || this.target.textContent);
    this.totalTime = this.delay + this.overall;
  }

  initialize(textData) {
    this.overall = 0;
    this.output = textData.trim().split('');

    return this.output.reduce((accum, item, index) => {
      let speed = this.speed;

      if (this.punctuation.includes(item)) speed = this.speed / 2;
      if (item === " ") speed = 0;

      this.overall += speed;
      accum[index] = [item, this.overall];
      return accum;
    }, {});
  }

  initEventListeners() {
    document.addEventListener("keyup", event => {
      if ([" ", "Enter"].includes(event.key)) {
        this.spedUp -= 0.2;
        if (this.spedUp < 0) this.spedUp = 0;
      }
    });
  }

  async print() {
    this.target.textContent = '';
    await new Promise(r => setTimeout(r, this.delay));
    for (const item of Object.values(this.content)) {
      item[1] = Math.round(item[1] * this.spedUp);
      setTimeout(() => {
        this.target.textContent += item[0];
      }, item[1]);
    }

    const finalize = () => {
      if (this.onComplete) { this.onComplete(); };
    }

    await new Promise(() => setTimeout(finalize, this.overall));
  }

}
