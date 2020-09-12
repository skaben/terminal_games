import Router from './index.js';

const router = Router.instance();

router
  .addRoute(/^$/, 'main')
  .addRoute(/^hack$/, 'hack')
  .setNotFoundPagePath('main')
  .listen();