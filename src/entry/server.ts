
import * as React from 'react';
import { createMemoryHistory } from 'history';

import { Paramorph, PathParams } from '../model';
import { HashMap, Locals, ServerRenderer, Router } from '../boot';
import RouteFactory from '../RouteFactory';

const paramorph : Paramorph = require('@website/_config.yml').default;

const pathParams = new PathParams();
const routeFactory = new RouteFactory();
const routes = routeFactory.getRoutes(paramorph, pathParams);
const router = new Router(routes);

export type WebpackStats = { compilation: { assets: HashMap<any>; } };

export function render(locals : Locals, stats : WebpackStats) {
  const history = createMemoryHistory();
  const renderer = new ServerRenderer(history, pathParams, router, paramorph);
  return renderer.render(locals, stats.compilation.assets);
}

export default render;

