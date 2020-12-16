import "./style.scss";
import view from "../../../util/mixins";

const menuObject = {

  items: [],

  rows: self => {
    return self.items.map((item, index) => {
      const {menu, href} = item;
      const link = href ? `/${href}` : 'javascript:;';
      return `
        <div class="menu__item">
          <a href="${link}" data-element="${index}" tabindex="${index + 1}">${menu}</a>
        </div>
      `
    }).join('');
  },

  template: self => {
    return `
      <div class="menu">
        ${self.rows(self)}
      </div>
    `;
  },

  focusRow: self => {
    // sooo, here we are, in need of hooks...
    const firstRow = self.subElements[Object.keys(self.subElements)[0]];
    firstRow.focus();
  }
}


const getMenu = (items) => {
  const menu = {
    ...view,
    ...menuObject
  };

  menu.items = items;
  menu.render(menu);
  menu.focusRow(menu);
  return menu;
}

export default getMenu;
