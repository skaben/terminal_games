import { canDestroyComponents, canRenderComponents } from './page';
import { canRenderAsyncWithComponents } from './render';
import { canGetSubElements, canRemove, canShow } from './view';
import TextBar from '../views/components/elements/textbar';
import Timer from '../views/components/elements/timer';

const documentMixin = {
  components: {},
  nav: {"back to menu": "/back"}
}

const canInitTimer = {
  initTimer() {
    if (this.timer && this.timer > 0) {
      this.nav = {};
      this.components['footer'] = new Timer({timer: this.timer, message: 'document blocked... '});
    }
    this.components['header'] = new TextBar({message: `:: requested document ${this.name}`, navData: this.nav});
  }
}

Object.assign(
  documentMixin,
  canInitTimer,
  canRenderComponents,
  canDestroyComponents,
  canGetSubElements,
  canRemove,
  canShow
)

export {
  documentMixin,
  canInitTimer,
  canRenderAsyncWithComponents
}
