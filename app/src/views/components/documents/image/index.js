import './style.scss';

import TextBar from '../../elements/textbar';
import Timer from '../../elements/timer';
import { documentMixin, canRenderAsyncWithComponents } from '../../../../mixins/document';

class ImageDoc {

  constructor({
    name,
    data,
    timer
  } = props) {
    this.name = name;
    this.data = data;
    this.timer = timer;
  }

  initComponents() {
    if (this.timer && this.timer > 0) {
      this.nav = {};
      this.components['footer'] = new Timer({timer: timer, message: 'document blocked... '});
    }

    this.components['header'] = new TextBar("header", `image document ${this.name}` || '', this.nav);
  }

  get template() {
    return `
      <div class="image-page">
        <div class="content__header" data-element="header"></div>
        <div class="content__main" data-element="main">
          <div class="image-wrapper">
            <div class="image-content" style="background-image: url(/asset/images/${this.image});"></div>
          </div>
        </div>
        <div class="content__footer" data-element="footer"></div>
      </div>
    `;
  }

}


const getImageDoc = (props) => {
  const image = new ImageDoc(props);
  Object.assign(
    image,
    documentMixin,
    canRenderAsyncWithComponents
  )
  image.render();
  return image;
}

export default getImageDoc;
