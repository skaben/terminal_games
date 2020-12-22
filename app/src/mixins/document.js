import { canDestroyComponents, canRenderComponents, canRenderAsyncWithComponents } from './page';
import { canGetSubElements, canRemove, canShow } from './view';

const documentMixin = {
  components: {},
  nav: {"back": "/back"}
}

Object.assign(
  documentMixin,
  canRenderComponents,
  canDestroyComponents,
  canGetSubElements,
  canRemove,
  canShow
)

export {
  documentMixin,
  canRenderAsyncWithComponents
}
