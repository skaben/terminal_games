import Router from './index.js';

const router = Router.instance();

router
  .addRoute(/^$/, 'load')
  .addRoute(/^menu$/, 'main')
  .addRoute(/^hack$/, 'game')
  .addRoute(/^404\/?$/, 'load')
  .setNotFoundPagePath('load')
  .listen();
