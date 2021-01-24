import { canRender } from './render';

const canGetSubElements = {
  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    this.subElements = [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
    return this.subElements;
  }
}

const canShow = {
  show(target) {
    const parent = target || document.body;
    parent.append(this.element);
  }
}

const canRemove = {
  remove() {
    this.element.remove();
  }
}


const viewMixin = {

  element: null,
  subElements: {}

}

Object.assign(
  viewMixin,
  canGetSubElements,
  canRemove,
  canShow
)

export {
  viewMixin,
  canRender,
  canGetSubElements,
  canRemove,
  canShow
}
