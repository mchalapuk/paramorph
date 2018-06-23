import { ComponentType, ReactElement, createElement } from 'react';
import { StaticRouter, Switch } from 'react-router-dom';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

import { PageWithRoute } from '../route-factory';
import { RootProps } from '../components/Root';
import { Paramorph, Page } from '../model';

export interface Locals {
  Root ?: ComponentType<RootProps>;
  path : string;
  js ?: string[];
  css ?: string[];
  assets : HashMap<string>;
  webpackStats : WebpackStats;
}

export interface WebpackStats {
  compilation : CompilationStats;
}
export interface CompilationStats {
  assets : HashMap<any>;
}
export interface HashMap<T> {
  [name : string] : T | undefined;
}

export class ServerRenderer {
  private Root : ComponentType<RootProps>;

  constructor(Root : ComponentType<RootProps>) {
    this.Root = Root;
  }

  render(locals : Locals, paramorph : Paramorph, routes : PageWithRoute[]) : HashMap<string> {
    const routeSwitch = createElement(Switch, {}, routes.map(r => r.route));

    return routes.reduce(
      (result : HashMap<string>, { page, route } : PageWithRoute) => {
        // react root contents rendered with react ids
        const router = createElement(StaticRouter, getRouterProps(page.url), routeSwitch);
        const body = renderToString(router);

        // site skeleton rendered without react ids
        const root = createElement(this.Root, getRootProps(locals, paramorph, page));
        const html = renderToStaticMarkup(root);

        result[page.url] = '<!DOCTYPE html>\n' + html.replace("%%%BODY%%%", body);
        return result;
      },
      {} as HashMap<string>,
    );
  }
}

export default ServerRenderer;

function getRouterProps(location : string) {
  return { location, context: {} };
}

function getRootProps(locals : Locals, paramorph : Paramorph, page : Page) {
  const assets = Object.keys(locals.webpackStats.compilation.assets)
    .map(url => `/${url}`);
  const css = assets.filter(value => value.match(/\.css$/));
  const js = assets.filter(value => value.match(/\.js$/));

  return {
    paramorph,
    page,
    localBundles: { css, js },
    externalBundles: { css: locals.css || [], js: locals.js || [] },
  };
}

