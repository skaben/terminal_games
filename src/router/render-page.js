// no dynamic import, dead simple

import hackPage from "../views/pages/hack";
import mainPage from "../views/pages/main";

const pages = {
  "hack": hackPage,
  "main": mainPage
}

export default async function(path, match) {
//  const Page = import(`../views/pages/main`);
//  const page = new Page(match);
  const Page = pages[path] || pages["main"];
  const page = new Page();
  await page.render();

  const contentNode = document.querySelector(".screen__content");
  contentNode.innerHTML = '';
  contentNode.appendChild(page.element);

  return page;
}

