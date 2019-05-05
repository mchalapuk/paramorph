
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
const history = createBrowserHistory();
const preloadUrls = getPreloadUrls(paramorph);

const CONTAINER_ID = 'root';

export function render() {
  const renderer = new ClientRenderer(history, pathParams, router, paramorph);

  const container = document.getElementById(CONTAINER_ID);
  if (container === null) {
    throw new Error(`couldn't find element of id '${CONTAINER_ID}'`);
  }
  renderer.render(container, preloadUrls);
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

function getPreloadUrls(paramorph : Paramorph) {
  const meta = document.getElementsByTagName('meta');

  return Array.from(meta)
    .filter(meta => meta.getAttribute('name') === 'paramorph-preload')
    .map(meta => meta.content)
    .filter(url => {
      if (url in paramorph.posts) {
        return true;
      }
      console.error(`unknown url found in paramorph-preload meta tag: ${url}`);
      return false;
    })
  ;
}

