// no dynamic import, dead simple

import("../assets/sounds/screen_change.mp3");

// const changeSound = new Audio("../assets/sounds/screen_change.mp3");

import gamePage from "../views/pages/game";
import mainPage from "../views/pages/main";
import loadPage from "../views/pages/loading";

const pages = {
  "game": gamePage,
  "main": mainPage,
  "load": loadPage
}

const loadingTemplate = `<div class='content-preload'></div>`;

export const renderDelay = 0;

export default async function(path, match) {
//  const Page = import(`../views/pages/main`);
//  const page = new Page(match);
  const contentNode = document.querySelector(".screen__content");
  contentNode.innerHTML = loadingTemplate;
  try {
    const makePage = pages[path] || pages["load"];
    const page = makePage();
    await page.render();
    setTimeout( () => {
      //changeSound.play();
      contentNode.innerHTML = '';
      contentNode.append(page.element);
      return page;
    }, renderDelay);
  } catch (err) {
    console.error(`ERROR while rendering page: ${err}`);
  }
}
