const canRender = {
  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template();
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(element);
    if (this.initEventListeners) this.initEventListeners();
    return this.element;
  }
}

const canRenderAsyncWithComponents = {
  async render() {
    const render = canRender.render.bind(this);
    this.element = render();

    await this.initComponents();
    this.renderComponents();
    if (this.initEventListeners) this.initEventListeners();

    return this.element;
  }
}

export {
  canRender,
  canRenderAsyncWithComponents
};
