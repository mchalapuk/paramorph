
import * as React from 'react';
import { createMemoryHistory } from 'history';

import { Paramorph } from '../model';
import { HashMap, Locals, ServerRenderer } from '../renderers/server';
import { UniversalRouter, Route, Context } from '../router';
import RoutesFactory from '../route-factory';

const paramorph : Paramorph = require('@website/_config.yml').default;

const routesFactory = new RoutesFactory();
const routes = routesFactory.getRoutes(paramorph);
const router = new UniversalRouter<Context, React.ComponentType<any>>(routes);

export type WebpackStats = { compilation: { assets: HashMap<any>; } };

export function render(locals : Locals, stats : WebpackStats) {
  const history = createMemoryHistory();
  const renderer = new ServerRenderer(history, router, paramorph);
  return renderer.render(locals, stats.compilation.assets);
}

export default render;

