import { renderDelay } from "../../../router/render-page";

export default class TypeWriter {

  punctuation = "[.,\/#!$%\^&\*;:{}=\-_`~()]".split('');
  overall;
  totalTime;

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

  async print() {
    this.target.textContent = '';
    await new Promise(r => setTimeout(r, this.delay));
    for (const item of Object.values(this.content)) {
      setTimeout(() => {
        this.target.textContent += item[0];
      }, item[1]);
    }

    const finalize = () => {
      if (this.onComplete) { this.onComplete(); };
    }

    await new Promise(() => setTimeout(finalize, this.overall));
  }

  remove() {
    this.element.remove()
  }

  destroy() {
    this.remove();
  }

}
