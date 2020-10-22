// no dynamic import, dead simple

import("../assets/sounds/screen_change.mp3");

const changeSound = new Audio("../assets/sounds/screen_change.mp3");

import hackPage from "../views/pages/hack";
import menuPage from "../views/pages/menu";
import mainPage from "../views/pages/main";

const pages = {
  "hack": hackPage,
  "menu": menuPage,
  "main": mainPage
}

const loadingTemplate = `<div class='content-preload'></div>`;

export const renderDelay = 500;

export default async function(path, match) {
//  const Page = import(`../views/pages/main`);
//  const page = new Page(match);
  const contentNode = document.querySelector(".screen__content");
  contentNode.innerHTML = loadingTemplate;

  const Page = pages[path] || pages["loading"];
  const page = new Page();
  await page.render();

  setTimeout( () => {
    //changeSound.play();
    contentNode.innerHTML = '';
    contentNode.append(page.element);
    return page;
  }, renderDelay);
}