
import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import { History } from 'history';

import { Router } from '../boot';
import { Paramorph, Post, PathParams } from '../model';
import { ContextContainer, Root as DefaultRoot, RootProps } from '../react';

export interface Locals {
  Root ?: React.ComponentType<RootProps>;
  js ?: string[];
  css ?: string[];
}

export class ServerRenderer {
  constructor(
    private readonly history : History,
    private readonly pathParams : PathParams,
    private readonly paramorph : Paramorph
  ) {
  }

  async render(locals : Locals, assets : HashMap<any>) : Promise<HashMap<string>> {
    const { paramorph, pathParams, history } = this;

    const Root = locals.Root || DefaultRoot;
    const rootProps = this.getRootProps(locals, assets);
    const posts = Object.keys(paramorph.posts)
      .map(key => paramorph.posts[key] as Post)
    ;
    // Preloading all content to be able to render posts containing content of other posts.
    await Promise.all(posts.map(post => paramorph.loadContent(post.url)));

    const content = paramorph.content;

    // Helper function for rendering posts
    function renderPost(
      post : Post,
      params : any,
      requestParameterizedRender: (params : any) => void,
      LayoutComponent : React.ComponentType<{}>,
      PostComponent : React.ComponentType<{}>,
    ) {
      pathParams.set(params);

      // Contains urls of posts which must be preloaded (client-side) in order to hydrate
      // initial state of current post. Each url must be rendered as paramorph-preload
      // meta tag in Root component from where it will be read in ClientRenderer.
      const preload : string[] = [];
      const proxy = createContentProxy(content, preload);
      Object.defineProperty(paramorph, 'content', {
        get: () => proxy,
      });

      // react root contents rendered with react ids
      const postElem = React.createElement(PostComponent);
      const layoutElem = React.createElement(LayoutComponent, {}, postElem);
      const appParams = { history, pathParams, paramorph, post, requestParameterizedRender };
      const appElem = React.createElement(ContextContainer, appParams, layoutElem);
      const body = ReactDomServer.renderToString(appElem);

      // site skeleton rendered without react ids
      const root = React.createElement(Root, { ...rootProps, post, preload });
      const html = ReactDomServer.renderToStaticMarkup(root);

      return '<!DOCTYPE html>\n' + html.replace("%%%BODY%%%", body);
    }

    const result = {} as HashMap<string>;

    // actual rendering
    for (const post of posts) {
      const LayoutComponent = await paramorph.loadLayout(post.layout);
      const PostComponent = await paramorph.loadContent(post.url);

      // Each page may request multiple renders of itself with specified path parameters.
      const renderRequests : any[] = [];
      const requestRender = (params : any[]) => renderRequests.push(params);

      // First render
      result[post.url] = renderPost(post, {}, requestRender, LayoutComponent, PostComponent);

      // Parameterized renders
      renderRequests.forEach(params => {
        const url = Object.keys(params)
          .reduce(
            (result, key) => result
              .replace(`:${key}?`, params[key])
              .replace(`:${key}`, params[key])
            ,
            post.permalink,
          )
          .replace(/\/:[^/:?]+\??(\/|$)/, '\/')
          .replace(/\/+/, '\/')
        ;
        result[url] = renderPost(post, params, noop, LayoutComponent, PostComponent);
      });
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

function noop() {
  // no op
}

