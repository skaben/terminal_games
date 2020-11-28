import { dispatchEvent, changeUrl } from "../../../util/helpers";

import "./style.scss";

export default class PowerOff {

    constructor(timeout) {
      this.timeout = timeout;
      this.render();
    }

    get template() {
      return `
        <div class="screen screen__background" style="background-color: black">
        </div>
      `;
    }

    render() {
      const element = document.createElement('div');
      element.innerHTML = this.template;
      this.element = element.firstElementChild;
      return this.element;
    }

    show(parent) {
      const target = parent || document.body;
      target.append(this.element);
    }

    remove() {
      this.element.remove()
    }

    destroy() {
      this.remove();
    }
}
