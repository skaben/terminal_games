import Menu from "../../components/menu";
import Image from '../../components/documents/image';

import { getData } from "../../../util/api";
import TypeWriter from "../../components/effects/typewriter";

import "../../../assets/styles/style.scss";
import { goRoot, changeUrl } from "../../../util/helpers";


// TODO: how to pass data to image, text, video, etc ???

const testData = [
  {
    'type': 'game',
    'href': 'hack',
    'menu': 'hack terminal now',
    'timer': -1
  },
  {
    'type': 'image',
    'data': 'fallout.png',
    'name': 'image_0001',
    'menu': 'show image',
    'timer': -1
  }
]

export default class Page {

    // should generate all sub-pages for menu-items too

    element;
    subElements = {};
    components = {};
    gameScenes = {};

    supported = {
      'image': Image,
    }

    URL = new URL("/api/menu", HOSTURL);

    async initComponents() {
      const apiData = await getData(this.URL);
      this.data = apiData.length === 0
                    ? testData
                    : apiData;

      try {
        const menu = new Menu(this.data);

        const typewriters = Object.values(menu.subElements).map(item => new TypeWriter(item, {speed: 15}));
        // todo: solution via promises
        typewriters.forEach((item, index, array) => {
          const prev = array[index - 1];
          if (prev) item.delay = prev.overall + prev.delay;
          item.print();
        });

        this.components.menu = menu;
        this.components.main = menu;
        return this.components;

      } catch (err) {
        console.error(err);
        await goRoot(err);
      }
    }

    initEventListeners() {
      this.element.addEventListener("pointerdown", event => {
        event.preventDefault();
        const target = event.target.closest('a');
        const index = target.dataset.element;
        const isGame = this.data[index]['type'] === 'game';

        if (isGame) {
          return changeUrl(target.href);
        } else if (target.href && target.href === '/back') {
          this.components.main = this.components.menu;
        } else {
          const gameScene = this.getGameScene(index);
          this.components.main = gameScene || this.components.menu;
        }

        this.renderComponents();
      });
    }

    getGameScene(index) {
      const scene = this.gameScenes[index];
      const inData = this.data[index];
      if (scene) return scene;
      if (!inData || inData['type'] === 'game') return;
      // get component object type
      const supported = this.supported[inData['type']];
      // return component instance with data provided
      return new supported(inData);
    }

    get template () {
      return `
        <div class="page">
          <div class="content__menu" data-element="main"></div>
        </div>
      `;
    }

    async render () {
      const element = document.createElement('div');

      element.innerHTML = this.template;

      this.element = element.firstElementChild;
      this.subElements = this.getSubElements(this.element);

      await this.initComponents();
      this.renderComponents();
      this.initEventListeners();

      return this.element;
    }

    renderComponents () {
      this.components['main'].show(this.subElements['main']);
    }

    getSubElements ($element) {
      const elements = $element.querySelectorAll('[data-element]');

      return [...elements].reduce((accum, subElement) => {
        accum[subElement.dataset.element] = subElement;

        return accum;
      }, {});
    }

    remove () {
      this.element.remove();
    }

    destroy () {
      this.remove();

      for (const component of Object.values(this.components)) {
        component.destroy();
      }
    }
  }
