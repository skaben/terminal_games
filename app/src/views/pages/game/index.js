import HackScreen from "../../components/games/hack";
import TextBar from "../../components/elements/textbar";
import { goRoot } from "../../../util/helpers";
import { getData } from "../../../util/api.js";
import TypeWriter from "../../components/effects/typewriter";
import { viewMixin } from "../../../mixins/view";
import { pageMixin, canRenderAsyncWithComponents } from "../../../mixins/page";

import "./style.scss";

const testData = {
  "words": ['AARDVARK', "TESTWORD", "WORDTEST", "VAARDARK", "TESTTEST", "WORDWORD", "ESTESTTT"],
  "password": "PASSWORD",
  "tries": 4,
  "timeout": 0,
  "cheatChance": 20,
  "cheatRemove": 10,
  "cheatRestore": 50,
  "header": 'text in hack header',
  "footer": 'text in hack footer'
}

class Page {

  element;
  subElements = {};
  components = {};

  URL = new URL("/api/hack", HOSTURL);

  async initComponents() {
    const apiData = await getData(this.URL) || {};
    const data = Object.keys(apiData).length === 0
                  ? testData
                  : apiData;

    try {
      this.components.header = TextBar({message: data.header || '', navData: {"back": "/"}});
      this.components.footer = TextBar({message: data.footer || ''});
      this.components.hack = HackScreen(data)

      this.assignTypewriters();
      return this.components;

    } catch (err) {
      console.error(err);
      await goRoot(err);
    }
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

  template() {
    return `
      <div class="page">
        <div class="content__header" data-element="header"></div>
        <div class="content__hack" data-element="hack"></div>
        <div class="content__footer" data-element="footer"></div>
      </div>
    `;
  }

}


const getHackPage = () => {
  const hack = new Page();

  Object.assign(
    hack,
    viewMixin,
    pageMixin,
    canRenderAsyncWithComponents
  )
  console.log(hack);
  return hack;
}

export default getHackPage;
