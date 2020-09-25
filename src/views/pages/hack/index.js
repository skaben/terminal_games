import HackScreen from "../../components/hack";
import TextBar from "../../components/elements/textbar";
import { dispatchEvent } from "../../../util/helpers";
import { getData, HOSTURL } from "../../../util/api.js";
import TypeWriter from "../../components/effects/typewriter";

import "./style.scss";
import { renderDelay } from "../../../router/render-page";


const testData = {
  words: ["BAR", "DAR", "VAR", "KAR", "ZAR", "CAR", "TAR"],
  tries: 4,
  password: "AAR",
  timeout: 0,
  chance: 40,
  text_header: "terminal vt40k stand-alone mode",
  text_footer: "uplink disabled, terminal offline"
}


export default class Page {

  element;
  subElements = {};
  components = {};
  
  URL = new URL("/api/hack", HOSTURL);

  async initComponents() {
    const data = await getData(this.URL) || testData;

    this.components.header = new TextBar("header", data.text_header, {"back": "/"});
    this.components.footer = new TextBar("footer", data.text_footer);
    this.components.hack = new HackScreen(data)

    this.assignTypewriters();
    return this.components;
  }

  assignTypewriters() {
    const headerNav = this.components.header.subElements.nav;
    const toggle = (element) => element.classList.toggle('invisible');

    toggle(headerNav);
    toggle(this.components.hack.element);

    // I really need await

    const headerTyper = new TypeWriter(this.components.header.subElements.main, {
                                        speed: 25,
                                        onComplete: () => toggle(headerNav)
                                      }),

          footerTyper = new TypeWriter(this.components.footer.element, {
                                        speed: 25, 
                                        delay: headerTyper.delay + headerTyper.overall,
                                        onComplete: () => toggle(this.components.hack.element)
                                      });

    for (const typer of [headerTyper, footerTyper]) {
      typer.print();
    }

  }

  get template() {
    return `
      <div class="page">
        <div class="content__header" data-element="header"></div>
        <div class="content__hack" data-element="hack"></div>
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

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

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
