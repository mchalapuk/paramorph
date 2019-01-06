
import * as React from 'react';
import { createBrowserHistory } from 'history';

import { Paramorph } from '../model';
import { ClientRenderer } from '../renderers/client';
import { Router } from '../router';
import RoutesFactory from '../route-factory';

const paramorph : Paramorph = require('@website/_config.yml').default;

const routesFactory = new RoutesFactory();
const routes = routesFactory.getRoutes(paramorph);
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

