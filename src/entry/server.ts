
import * as React from 'react';
import { createMemoryHistory } from 'history';

import { Paramorph } from '../model';
import { HashMap, Locals, ServerRenderer, Router } from '../boot';
import RouteFactory from '../RouteFactory';

const paramorph : Paramorph = require('@website/_config.yml').default;

const routeFactory = new RouteFactory();
const routes = routeFactory.getRoutes(paramorph);
const router = new Router(routes);

export type WebpackStats = { compilation: { assets: HashMap<any>; } };

export function render(locals : Locals, stats : WebpackStats) {
  const history = createMemoryHistory();
  const renderer = new ServerRenderer(history, router, paramorph);
  return renderer.render(locals, stats.compilation.assets);
}

export default render;

