import { createElement, Component, Children } from 'react';
import { render } from 'react-dom';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StaticRouter, BrowserRouter, Switch } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import { HashMap, Locals, ServerRenderer } from './renderers/server';
import Root from './components/Root';

import RoutesFactory from './route-factory';
import website from './data';

const routesFactory = new RoutesFactory()
const routes = routesFactory.getRoutes(website);

const serverRender = (locals : Locals) => {
  const renderer = new ServerRenderer(Root);
  return renderer.render(locals, routes);
}

const clientRender = () => {
  const container = document.getElementById('root');
  const child = createElement(Switch, {}, routes.map(e => e.route));
  const router = createElement(BrowserRouter, {}, child);
  const app = createElement(AppContainer, {}, router);
  render(app, container);
}

if (typeof window !== 'undefined') {
  window.addEventListener('load', clientRender);
}

export default serverRender;

if (module.hot) {
  module.hot.accept('./routes', clientRender);
}

