import { ComponentType, ReactElement, createElement } from 'react';
import { StaticRouter, Switch } from 'react-router-dom';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

import { PageWithRoute } from '../route-factory';
import { RootProps } from '../components/Root';
import { Website, Page } from '../models';

export interface HashMap<T> {
  [name : string] : T;
};

export interface Locals {
  title : string;
  path : string;
  js ?: string[];
  css ?: string[];
  assets : HashMap<{}>;
}

export class ServerRenderer {
  private Root : ComponentType<RootProps>;

  constructor(Root : ComponentType<RootProps>) {
    this.Root = Root;
  }

  render(locals : Locals, routes : PageWithRoute[]) : HashMap<string> {
    const routeSwitch = createElement(Switch, {}, routes.map(r => r.route));

    return routes.reduce(
      (result : HashMap<string>, { page, route } : PageWithRoute) => {
        // react root contents rendered with react ids
        const router = createElement(StaticRouter, getRouterProps(page.url), routeSwitch);
        const body = renderToString(router);

        // site skeleton rendered without react ids
        const root = createElement(this.Root, getRootProps(locals, page));
        const html = renderToStaticMarkup(root);

        result[page.url] = '<!DOCTYPE html>\n' + html.replace("%%%BODY%%%", body);
        return result;
      },
      {} as HashMap<string>
    );
  }
}

export default ServerRenderer;

function getRouterProps(location : string) {
  return { location, context: {} };
}

function getRootProps(locals : Locals, page : Page) {
  const title = page.title + (locals.title ? ` | ${locals.title}` : '');

  const assets = Object.keys(locals.assets);
  const css = assets.filter(value => value.match(/\.css$/));
  const js = assets.filter(value => value.match(/\.js$/));

  return {
    page: Object.assign(page, { title }),
    localBundles: { css, js },
    externalBundles: { css: locals.css || [], js: locals.js || [] },
  };
}

