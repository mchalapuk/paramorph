
import { ComponentType, ReactElement, createElement } from 'react';

import { UniversalRouter, Context } from '../router';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { History } from 'history';

import { default as DefaultRoot, RootProps } from '../components/Root';
import { Paramorph, Page } from '../model';
import { ContextContainer } from '../react';

export interface Locals {
  Root ?: ComponentType<RootProps>;
  path : string;
  js ?: string[];
  css ?: string[];
  assets : HashMap<string>;
  webpackStats : { compilation: { assets: HashMap<any>; } };
}

export class ServerRenderer {
  constructor(
    private history : History,
    private router : UniversalRouter<Context, ComponentType<any>>,
    private paramorph : Paramorph
  ) {
  }

  async render(locals : Locals) : Promise<HashMap<string>> {
    const Root = locals.Root || DefaultRoot;

    const pages = Object.keys(this.paramorph.pages)
      .map(key => this.paramorph.pages[key] as Page);
    const result = {} as HashMap<string>;
    const { paramorph, history, router } = this;

    await Promise.all(pages.map(async (page : Page) => {
      // react root contents rendered with react ids
      const pageElement = await router.resolve(page.url);

      const props = { history, paramorph, page };
      const app = createElement(ContextContainer, props, pageElement);
      const body = renderToString(app);

      // site skeleton rendered without react ids
      const root = createElement(Root, getRootProps(locals, paramorph, page));
      const html = renderToStaticMarkup(root);

      result[page.url] = '<!DOCTYPE html>\n' + html.replace("%%%BODY%%%", body);
    }));

    return result;
  }
}

export default ServerRenderer;

export interface HashMap<T> {
  [name : string] : T | undefined;
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

