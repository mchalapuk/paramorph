
import * as React from 'react';
import { createBrowserHistory } from 'history';

import { Paramorph } from '../model';
import { ClientRenderer, Router } from '../boot';
import RouteFactory from '../RouteFactory';

const paramorph : Paramorph = require('@website/_config.yml').default;

const routeFactory = new RouteFactory();
const routes = routeFactory.getRoutes(paramorph);
const router = new Router(routes);

export function render() {
  const history = createBrowserHistory();
  const renderer = new ClientRenderer(history, router, paramorph);
  renderer.render('root');
}

export default render;

if (document.readyState === 'complete') {
  render();
} else {
  window.addEventListener('load', render);
}

if (module.hot) {
  module.hot.accept('./route-factory', render);
}

