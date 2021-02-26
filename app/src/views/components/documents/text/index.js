import './style.scss';

import { documentMixin, canRenderAsyncWithComponents } from '../../../../mixins/document';


class TextDoc {

  constructor({
    name,
    data,
    timer
  } = props) {
    this.name = name;
    this.text = data.split('\n').join('<br>');
    this.timer = timer;
  }

  initComponents() {
    this.initTimer();
  }

  template() {
    return `
      <div class="content">
        <div class="content__header">
          <div class="header-nav" data-element="header"></div>
        </div>
        <div class="content__main content-text" data-element="main" tabindex="0">
        </div>
        <div class="content__footer" data-element="footer"></div>
      </div>
    `;
  }

  print() {
    this.subElements.main.innerHTML = this.text;
    this.subElements.main.focus();
  }

}


const getTextDoc = (props) => {
  const text = new TextDoc(props);
  Object.assign(
    text,
    documentMixin,
    canRenderAsyncWithComponents
  )
  text.render();
  text.print();
  return text;
}

export default getTextDoc;
