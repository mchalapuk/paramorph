import 'source-map-support/register';

import { ComponentType } from 'react';
import { createMemoryHistory, createBrowserHistory } from 'history';

import { Paramorph } from './model';
import { HashMap, Locals, ServerRenderer } from './renderers/server';
import { ClientRenderer } from './renderers/client';
import { UniversalRouter, Route, Context } from './router';
import RoutesFactory from './route-factory';

const paramorph : Paramorph = require('@website/_config.yml');

const routesFactory = new RoutesFactory();
const routes = routesFactory.getRoutes(paramorph);
const router = new UniversalRouter<Context, ComponentType<any>>(routes);

const serverRender = (locals : Locals) => {
  const history = createMemoryHistory();
  const renderer = new ServerRenderer(history, router, paramorph);
  return renderer.render(locals);
}

const clientRender = () => {
  const history = createBrowserHistory();
  const renderer = new ClientRenderer(history, router, paramorph);
  renderer.render('root');
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    clientRender();
  } else {
    window.addEventListener('load', clientRender);
  }
}

export default serverRender;

if (module.hot) {
  module.hot.accept('./data', clientRender);
}

