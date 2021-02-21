import "./style.scss";
import { viewMixin, canRender } from '../../../mixins/view';

class PowerOff {

    constructor(timeout) {
      this.timeout = timeout;
    }

    template() {
      return `
        <div style="position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; background-color: black; z-index: 999;">
          <div style="position: absolute; top: 30%; left: 33%;">
            <p style="color: #222; font-size: 4rem; text-align: center;">POWER OFF</p>
          </div>
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
