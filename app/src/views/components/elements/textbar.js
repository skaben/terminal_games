import './textbar.scss';
import { viewMixin, canRender } from "../../../mixins/view";

class TextBar {

    constructor({
      message,
      navData
    }) {
      this.message = message || "!! screen configuration failed, call system administator !!";
      this.navData = navData;
    }

    template() {
      return `
        <div class="textbar">
          <div class="textbar__main" data-element="main">${this.message}</div>
          <div class="textbar__nav" data-element="nav">${this.nav}</div>
        </div>
      `
    }

    get nav() {
      if (!this.navData) return '';

      return Object.entries(this.navData).map(entry => {
        const [text, link] = [...entry];
        return `<a href="${link}">${text}</a>`
      }).join('');
    }

}


const getTextbar = (props) => {
  const textbar = new TextBar(props);
  Object.assign(
    textbar,
    viewMixin,
    canRender
  );
  textbar.render();
  return textbar;
}

export default getTextbar;
