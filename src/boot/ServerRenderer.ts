
import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import { History } from 'history';

import { Router } from '../boot';
import { Paramorph, Page } from '../model';
import { ContextContainer, Root as DefaultRoot, RootProps } from '../react';

export interface Locals {
  Root ?: React.ComponentType<RootProps>;
  js ?: string[];
  css ?: string[];
}

export class ServerRenderer {
  constructor(
    private history : History,
    private router : Router,
    private paramorph : Paramorph
  ) {
  }

  async render(locals : Locals, assets : HashMap<any>) : Promise<HashMap<string>> {
    const { paramorph, history, router } = this;

    const Root = locals.Root || DefaultRoot;
    const rootProps = this.getRootProps(locals, assets);
    const pages = Object.keys(paramorph.pages)
      .map(key => paramorph.pages[key] as Page)
    ;

    // Preloading all content to be able to render pages containing content of other pages.
    await Promise.all(pages.map(page => paramorph.loadContent(page.url)));

    const content = paramorph.content;
    const result = {} as HashMap<string>;

    for (const page of pages) {
      // Contains urls of pages which must be preloaded (client-side) in order to hydrate
      // initial state of current page. Each url must be rendered as paramorph-preload
      // meta tag in Root component from where it will be read in ClientRenderer.
      const preload : string[] = [];
      const proxy = createContentProxy(content, preload);
      Object.defineProperty(paramorph, 'content', {
        get: () => proxy,
      });

      // react root contents rendered with react ids
      const { LayoutComponent, PageComponent } = await router.resolve(page.url);
      const pageElem = React.createElement(PageComponent);
      const layoutElem = React.createElement(LayoutComponent, {}, pageElem);
      const appElem = React.createElement(ContextContainer, { history, paramorph, page }, layoutElem);
      const body = ReactDomServer.renderToString(appElem);

      // site skeleton rendered without react ids
      const root = React.createElement(Root, { ...rootProps, page, preload });
      const html = ReactDomServer.renderToStaticMarkup(root);

      result[page.url] = '<!DOCTYPE html>\n' + html.replace("%%%BODY%%%", body);
    }

    return result;
  }

  private getRootProps(locals : Locals, assets : HashMap<any>) {
    const { paramorph } = this;
    const assetUrls = Object.keys(assets)
      // filtering out static generator entry point
      .filter(url => !url.match(/^server-.*\.js$/))
      // filtering out async bundles
      .filter(url => !url.match(/^[0-9]+-.*\.js$/))
      .map(url => `/${url}`)
    ;
    return {
      localBundles: {
        css: assetUrls.filter(value => value.match(/\.css$/)),
        js: assetUrls.filter(value => value.match(/\.js$/)),
      },
      externalBundles: {
        css: locals.css || [],
        js: locals.js || [],
      },
      paramorph,
    };
  }
}

export default ServerRenderer;

export interface HashMap<T> {
  [name : string] : T | undefined;
}

function createContentProxy(
  content : HashMap<React.ComponentType<{}>>,
  preload : string[],
) : (
  HashMap<React.ComponentType<{}>>
) {
  return new Proxy(content, {
    has: (target : any, url : string) => {
      return url in target;
    },
    get: (target : any, url : string) => {
      if (preload.indexOf(url) === -1) {
        preload.push(url);
      }
      return target[url];
    },
  });
}

