import { ComponentType, ReactElement, createElement } from 'react';
import { default as UniversalRouter, Route, Context } from 'universal-router';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'history';

import { RootProps } from '../components/Root';
import { Paramorph, Page } from '../model';
import { ContextContainer } from './ContextContainer';

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

  async render(
    locals : Locals,
    paramorph : Paramorph,
    routes : Route[]
  ) : Promise<HashMap<string>> {

    const router = new UniversalRouter<Context, ComponentType<any>>(routes);

    const pages = Object.keys(paramorph.pages)
      .map(key => paramorph.pages[key] as Page);
    const result = {} as HashMap<string>;

    const promises = pages.map(async (page : Page) => {
      // react root contents rendered with react ids
      const component = await router.resolve(page.url);

      const history = createMemoryHistory();
      const app = createElement(ContextContainer, { history, paramorph, page }, component);
      const body = renderToString(app);

      // site skeleton rendered without react ids
      const root = createElement(this.Root, getRootProps(locals, paramorph, page));
      const html = renderToStaticMarkup(root);

      result[page.url] = '<!DOCTYPE html>\n' + html.replace("%%%BODY%%%", body);
    });

    await Promise.all(promises);
    return result;
  }
}

export default ServerRenderer;

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

