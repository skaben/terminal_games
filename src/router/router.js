import Router from './index.js';

const router = Router.instance();

router
  .addRoute(/^$/, 'main')
  .addRoute(/^menu$/, 'menu')
  .addRoute(/^hack$/, 'hack')
  .addRoute(/^404\/?$/, 'main')
  .setNotFoundPagePath('main')
  .listen();