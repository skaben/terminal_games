import './style.scss';

import { documentMixin, canRenderAsyncWithComponents } from '../../../../mixins/document';

class ImageDoc {

  constructor({
    name,
    data,
    timer
  } = props) {
    this.name = name;
    this.image = data;
    this.timer = timer;
  }

  initComponents() {
    this.initTimer();
  }

  template() {
    return `
      <div class="content">
        <div class="content__header" data-element="header"></div>
        <div class="content__main" data-element="main">
          <div class="image-wrapper">
            <div class="image-content" style="background-image: url(/assets/images/${this.image});"></div>
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
