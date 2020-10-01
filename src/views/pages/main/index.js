import LoadingScreen from "../../components/loading";
import TextBar from "../../components/elements/textbar";
import TypeWriter from "../../components/effects/typewriter";

import "./style.scss";

import { getData, HOSTURL } from "../../../util/api";


const pageDefaults = {
  header: "error: terminal uplink disabled",
  footer: "call system administrator ASAP"
}


export default class Page {

  element;
  subElements = {};
  components = {};

  URL = new URL("/api/device", HOSTURL);

  async initComponents() {
    const data = await getData(this.URL) || pageDefaults;

    const header = new TextBar("header", data.header),
          main = new LoadingScreen(data.timeout || 0),
          footer = new TextBar("footer", data.footer);

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
