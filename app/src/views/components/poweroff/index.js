import "./style.scss";
import { viewMixin, canRender } from '../../../mixins/view';

class PowerOff {

    constructor(timeout) {
      this.timeout = timeout;
    }

    template() {
      return `
        <div class="screen screen__background" style="background-color: black">
        </div>
      `;
    }

}


const getView = (timeout) => {
  const poweroff = new PowerOff(timeout);
  Object.assign(
    poweroff,
    viewMixin,
    canRender
  )
  poweroff.render();
  return poweroff;
}

export default getView;
