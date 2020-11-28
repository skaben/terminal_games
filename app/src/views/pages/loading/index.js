import Loading from "../../components/system";
import PowerOff from "../../components/poweroff";
import TextBar from "../../components/elements/textbar";
import Timer from "../../components/elements/timer";
import TypeWriter from "../../components/effects/typewriter";

import "./style.scss";

import { getData } from "../../../util/api";

const testData = {
  'footer': 'text in main footer',
  'header': 'text in main header',
  'blocked': false,
  'powered': true,
  'timeout': 120
}

export default class Page {

  data;
  element;
  subElements = {};
  components = {};

  URL = new URL("/api/main", HOSTURL);

  async initComponents() {
    const apiData = await getData(this.URL);
    this.data = Object.keys(apiData).length === 0
                  ? testData
                  : apiData;

    if (!this.data.powered) {
      this.setPowerOff()
    } else if (this.data.blocked) {
      this.setBlockedMode();
    } else {
      // should be handled by custom switchpage event...
      window.location.href = '/menu';
    }
  }

  setPowerOff() {
    const main = new PowerOff();

    this.components.main = main;
    return this.components;
  }

  setBlockedMode() {

    const headerText = this.data.header || '[terminal blocked]';
    const footerText = this.data.footer || '[terminal blocked]'

    const header = new TextBar("header", headerText),
          // todo: move change screen ops to timer callbacks!
          main = new Loading(this.data.timeout || 0, this.data.nextScreen),
          footer = new Timer({
            name: "footer",
            timer: this.data.timeout,
            message: footerText,
          });

    const headerTyping = new TypeWriter(header.subElements.main);

    const footerTyping = new TypeWriter(footer.subElements.main, {
                                          delay: headerTyping.totalTime,
                                        });

    headerTyping.print();
    footerTyping.print();

    this.components.header = header;
    this.components.footer = footer;
    this.components.main = main;

    this.element.addEventListener("loadingEnd", () => console.log('end loading'));

    return this.components;
  }

  get template() {
    return `
      <div class="page">
        <div class="content__header" data-element="header"></div>
        <div class="content__main" data-element="main"></div>
        <div class="content__footer" data-element="footer"></div>
      </div>
    `;
  }

  async render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);

    await this.initComponents();
    this.renderComponents();

    return this.element;
  }

  renderComponents() {
    Object.keys(this.components).forEach(component => {
      const root = this.subElements[component];
      this.components[component].show(root);
    });
  }

  getSubElements($element) {
    const elements = $element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();

    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}
