
import * as React from 'react';
import { createMemoryHistory } from 'history';

import { Paramorph, PathParams } from '../model';
import { HashMap, Locals, ServerRenderer } from '../boot';

const paramorph : Paramorph = require('@website/_config.yml').default;

const pathParams = new PathParams();

export type WebpackStats = { compilation: { assets: HashMap<any>; } };

export function render(locals : Locals, stats : WebpackStats) {
  const history = createMemoryHistory();
  const renderer = new ServerRenderer(history, pathParams, paramorph);
  return renderer.render(locals, stats.compilation.assets);
}

export default render;

