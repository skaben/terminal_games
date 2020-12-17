const canRenderAsyncWithComponents = {
  async render() {
    const element = document.createElement('div');
    element.innerHTML = this.template();
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);

    await this.initComponents();
    this.renderComponents();
    if (this.initEventListeners) this.initEventListeners();

    return this.element;
  }
}

const canRenderComponents = {
  renderComponents() {
    Object.keys(this.components).forEach(component => {
      const root = this.subElements[component];
      this.components[component].show(root);
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
