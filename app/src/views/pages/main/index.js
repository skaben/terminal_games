import getMenu from "../../components/menu";
import Image from '../../components/documents/image';
import Audio from '../../components/documents/audio';
import Text from '../../components/documents/text';
import Video from '../../components/documents/video';
import Input from '../../components/documents/input';

import { viewMixin } from '../../../mixins/view';
import { canDestroyComponents } from "../../../mixins/page"
import { canRenderAsyncWithComponents } from '../../../mixins/render';

import { getData } from "../../../util/api";
import TypeWriter from "../../components/effects/typewriter";

import "../../../assets/styles/style.scss";
import { goRoot, changeUrl } from "../../../util/helpers";


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
  },
  {
    'type': 'audio',
    'data': 'screen_change.mp3',
    'name': 'audio_0001',
    'menu': 'audio',
    'timer': -1
  },
  {
    'type': 'text',
    'data': 'this_is_the_test text'.repeat(2560),
    'name': 'text',
    'menu': 'longtext',
    'timer': -1
  },
  {
    'type': 'video',
    'data': 'test.mp4',
    'name': 'vidos',
    'menu': 'video file',
    'timer': -1
  },
  {
    'type': 'input',
    'data': {'message': 'enter password', 'expected': 'password'},
    'name': 'vidos',
    'menu': 'user input',
    'timer': -1
  },
]

class Page {

    components = {};
    gameScenes = {};

    supported = {
      'image': Image,
      'audio': Audio,
      'text': Text,
      'input': Input,
      //'video': Video
    }

    URL = new URL("/api/menu", HOSTURL);

    async initComponents() {
      const apiData = await getData(this.URL) || [];
      this.data = apiData.length === 0
                    ? testData
                    : apiData;

      try {
        const menu = getMenu(this.data);
        this.printMenu(menu);

        // assign main component for rendering
        this.components.menu = menu;
        this.components.main = menu;
        return this.components;
      } catch (err) {
        console.error(err);
        await goRoot(err);
      }
    }

    renderComponents() {
      this.subElements['main'].innerHTML = '';
      this.components.main.show(this.subElements['main']);
    }

    initEventListeners() {
      this.element.addEventListener("pointerdown", event => {
        event.preventDefault();
        const target = event.target.closest('a');
        if (!target) return;

        if (target.href && target.href.split('/')[-1] === 'back') {
          // intercept /back from child component, render menu
          this.components.main = this.components.menu;
        } else {
          const index = target.dataset.element;

          if (this.data[index] && this.data[index]['type'] === 'game') {
            // menu item points to external game - just change URL
            this.components.main.remove();
            return changeUrl(target.href);
          } else {
            // menu item points to supported document - render child component for it
            const gameScene = this.getGameScene(index);
            if (!gameScene) return;
            this.components.main = gameScene;
          }
        }
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
          if (!supported) { throw `${data['type']} is not in ${this.supported} list`};
          scene = supported(data);
        } catch (err) {
          console.error(`[!] when rendering ${data['type']} ${err}`);
        }
      };
      return scene;
    }

    template() {
      return `
        <div class="content">
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
    canDestroyComponents,
    canRenderAsyncWithComponents
  );

  return page;
}

export default getMenuPage;
