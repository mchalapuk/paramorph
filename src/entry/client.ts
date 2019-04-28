
import * as React from 'react';
import { createBrowserHistory } from 'history';

import { Paramorph, PathParams } from '../model';
import { ClientRenderer, Router } from '../boot';
import RouteFactory from '../RouteFactory';

// webpack doesn't do this for some reason
global.setImmediate = setImmediate;
global.clearImmediate = clearImmediate;

const paramorph : Paramorph = require('@website/_config.yml').default;

const pathParams = new PathParams();
const routeFactory = new RouteFactory();
const routes = routeFactory.getRoutes(paramorph, pathParams);
const router = new Router(routes);

export function render() {
  const history = createBrowserHistory();
  const renderer = new ClientRenderer(history, pathParams, router, paramorph);
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

