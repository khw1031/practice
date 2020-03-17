// Controller
import Controller from './controller';
import { $on } from './helper';

// template
import Template from './template';
// Store
import Store from './store';
// View
import View from './view';

const main = () => {
  const store = new Store('todo-vanilla-es6', () =>
    console.log('Store initilized')
  );
  const template = new Template();
  const view = new View(template);
  const controller = new Controller(store, view);

  const setView = () => controller.setView(document.location.hash);

  $on(window, 'load', setView);
  $on(window, 'hashchange', setView);
};

export default main;
