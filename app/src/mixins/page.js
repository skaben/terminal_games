import { canRenderAsyncWithComponents } from './render';

const canRenderComponents = {
  renderComponents() {
    Object.entries(this.components).forEach(([key, val]) => {
      if (!val.element) val.render();
      const root = this.subElements[key];
      this.components[key].show(root);
    });
  }
}

const canDestroyComponents = {
  destroy() {
    this.remove();

    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}

const pageMixin = {
  components: {},
}

Object.assign(
  pageMixin,
  canRenderComponents,
  canDestroyComponents,
)

export {
  pageMixin,
  canRenderAsyncWithComponents,
  canRenderComponents,
  canDestroyComponents,
}
