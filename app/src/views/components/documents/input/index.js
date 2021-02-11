import './style.scss';

import { documentMixin, canRenderAsyncWithComponents } from '../../../../mixins/document';

class InputDoc {

  constructor({
    name,
    data,
    timer
  } = props) {
    this.name = name;
    this.message = data['message'];
    this.expected = data['expected'];
    this.timer = timer;
  }

  initComponents() {
    this.initTimer({header: ':: escalation in progress...'});
  }

  template() {
    return `
      <div class="content">
        <div class="content__header" data-element="header"></div>
        <div class="content__main" data-element="main">
          <form class="input-form" name="user">
          <textarea value="test"></textarea>
          </form>
        </div>
        <div class="content__footer" data-element="footer"></div>
      </div>
    `;
  }

}


const getInputDoc = (props) => {
  const input = new InputDoc(props);
  Object.assign(
    input,
    documentMixin,
    canRenderAsyncWithComponents
  )
  input.render();
  return input;
}

export default getInputDoc;
