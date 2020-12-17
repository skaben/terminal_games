import getMenu from "../../components/menu";
import Image from '../../components/documents/image';
import { viewMixin } from '../../../mixins/view';
import { pageMixin, canRenderAsyncWithComponents } from "../../../mixins/page"

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
    'data': 'test.jpg',
    'name': 'image_0001',
    'menu': 'show image file',
    'timer': -1
  },
  {
    'type': 'image',
    'data': 'test.jpg',
    'name': 'image_0001',
    'menu': 'timer show image file',
    'timer': 5
  },
  {
    'type': 'image',
    'data': 'height.jpg',
    'name': 'image_0001',
    'menu': 'height image',
    'timer': -1
  },
  {
    'type': 'image',
    'data': 'width.jpg',
    'name': 'image_0001',
    'menu': 'width image',
    'timer': -1
  }
]

class Page {

    // should generate all sub-pages for menu-items too

    components = {};
    gameScenes = {};

    supported = {
      'image': Image,
    }

    URL = new URL("/api/menu", HOSTURL);

    async initComponents() {
      const apiData = await getData(this.URL) || [];
      this.data = apiData.length === 0
                    ? testData
                    : apiData;

      try {
        //const menu = new Menu(this.data);
        const menu = getMenu(this.data);
        this.printMenu(menu);

        this.components.menu = menu;
        this.components.main = menu;
        return this.components;

      } catch (err) {
        console.error(err);
        //await goRoot(err);
      }
    }

    initEventListeners() {
      this.element.addEventListener("pointerdown", event => {
        event.preventDefault();
        const target = event.target.closest('a');

        if (target.href && target.href.split('/')[-1] === 'back') {
          // intercept /back from child component, render menu
          this.components.main = this.components.menu;
        } else {
          const index = target.dataset.element;

          if (this.data[index] && this.data[index]['type'] === 'game') {
            // menu item points to external game - just change URL
            return changeUrl(target.href);
          } else {
            // menu item points to supported document - render child component for it
            const gameScene = this.getGameScene(index);
            this.components.main = gameScene || this.components.menu;
          }
        }
        this.subElements['main'].innerHTML = '';
        this.renderComponents();
      });
    }

    printMenu(menu) {
      const typewriters = Object.values(menu.subElements).map(item => new TypeWriter(item, {speed: 15}));
      // todo: solution via promises
      typewriters.forEach((item, index, array) => {
        const prev = array[index - 1];
        if (prev) item.delay = prev.overall + prev.delay;
        item.print();
      });
    }

    getGameScene(index) {
      let scene = this.gameScenes[index];
      const data = this.data[index];
      if (!data || data['type'] === 'game') return;
      if (!scene) {
        // get component object type
        try {
          const supported = this.supported[data['type']];
          console.log(supported);
          scene = new supported(data);
        } catch (err) {
          console.error(`[!] when rendering ${data['type']} ${err}`);
        }
      };
      return scene;
    }

    template() {
      return `
        <div class="page">
          <div class="content__menu" data-element="main"></div>
        </div>
      `;
    }

}

const getMenuPage = () => {
  const page = new Page();

  Object.assign(
    page,
    viewMixin,
    pageMixin,
    canRenderAsyncWithComponents
  );

  return page;
}

export default getMenuPage;
