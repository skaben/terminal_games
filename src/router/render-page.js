// no dynamic import, dead simple

import("../assets/sounds/screen_change.mp3");

const changeSound = new Audio("../assets/sounds/screen_change.mp3");

import hackPage from "../views/pages/hack";
import mainPage from "../views/pages/main";

const pages = {
  "hack": hackPage,
  "main": mainPage
}

const loadingTemplate = `<div class='content-preload'></div>`;

export default async function(path, match) {
//  const Page = import(`../views/pages/main`);
//  const page = new Page(match);
  const contentNode = document.querySelector(".screen__content");
  contentNode.innerHTML = loadingTemplate;

  const Page = pages[path] || pages["main"];
  const page = new Page();
  await page.render();

  setTimeout( () => {
    changeSound.play();
    contentNode.innerHTML = '';
    contentNode.appendChild(page.element);
    return page;
  }, 500);
}

