import Router from './index.js';
import "../assets/sounds/screen_change.mp3";

const changeSound = new Audio("../assets/sounds/screen_change.mp3");
const router = Router.instance();

const playSound = () => {changeSound.play()};

window.onload = playSound;
window.onpopstate = playSound;

router
  .addRoute(/^$/, 'main')
  .addRoute(/^hack$/, 'hack')
  .addRoute(/^404\/?$/, 'main')
  .setNotFoundPagePath('main')
  .listen();