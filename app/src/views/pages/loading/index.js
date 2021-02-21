import Loading from "../../components/system";
import PowerOff from "../../components/poweroff";
import textBar from "../../components/elements/textbar";
import Timer from "../../components/elements/timer";
import TypeWriter from "../../components/effects/typewriter";
import { viewMixin } from '../../../mixins/view';
import { pageMixin, canRenderAsyncWithComponents } from '../../../mixins/page';


import "./style.scss";

import { getData } from "../../../util/api";

let testData = {
  'footer': 'text in main footer',
  'header': 'text in main header',
  'blocked': false,
  'powered': true,
  'timeout': 120
}

if (!DEBUG) {
  testData = {};
}

class Page {

  data;
  components = {};

  URL = new URL("/api/main", HOSTURL);

  async initComponents() {
    const apiData = await getData(this.URL) || {};
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
    this.components.main = new PowerOff();
    return this.components;
  }

  setBlockedMode() {

    const headerText = this.data.header || '[terminal blocked]';
    const footerText = this.data.footer || '[terminal blocked]'

    const header = textBar({message: headerText}),
          // todo: move change screen ops to timer callbacks!
          main = Loading(this.data.timeout || 0, this.data.nextScreen),
          footer = Timer({
            timer: this.data.timeout,
            message: footerText,
          });

    const headerTyping = TypeWriter(header.subElements.main);

    const footerTyping = TypeWriter(footer.subElements.main, {
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

  template() {
    return `
      <div class="content">
        <div class="content__header" data-element="header"></div>
        <div class="content__main" data-element="main"></div>
        <div class="content__footer" data-element="footer"></div>
      </div>
    `;
  }

}


const getLoadingPage = () => {
  const page = new Page();

  Object.assign(
    page,
    viewMixin,
    pageMixin,
    canRenderAsyncWithComponents
  );
  return page;
}

export default getLoadingPage;
