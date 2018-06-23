
import { Paramorph } from './model';

import { HashMap, Locals, ServerRenderer } from './renderers/server';
import { ClientRenderer } from './renderers/client';
import DefaultRoot from './components/Root';

import RoutesFactory from './route-factory';

const paramorph : Paramorph = require('./config');

const routesFactory = new RoutesFactory();
const routes = routesFactory.getRoutes(paramorph);

const serverRender = (locals : Locals) => {
  const renderer = new ServerRenderer(locals.Root || DefaultRoot);
  return renderer.render(locals, paramorph, routes);
}

const clientRender = () => {
  const renderer = new ClientRenderer();
  renderer.render('root', routes);
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

