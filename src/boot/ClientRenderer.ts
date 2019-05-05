
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as ReactDomServer from 'react-dom/server';
import { History, createBrowserHistory } from 'history';

import { Router } from '../boot';
import { ContextContainer } from '../react';
import { Paramorph, Post, Layout, PathParams } from '../model';

export class ClientRenderer {
  constructor(
    private readonly history : History,
    private readonly pathParams : PathParams,
    private readonly router : Router,
    private readonly paramorph : Paramorph,
  ) {
  }

  render(container : HTMLElement, preloadUrls : string[]) : Promise<void> {
    const { history, paramorph } = this;
    const { posts } = paramorph;
    const notFound = posts['/404/'] as Post;

    const unlisten = history.listen(location => {
      this.resolve(location.pathname, container);
    });
    // window.addEventListener('unload', unlisten);

    const { pathname } = history.location;

    // We need to wait for content from paramorph-preload meta tags to be loaded
    // (same as server-side) in order to hydrate initial post without a warning.
    return Promise.all(preloadUrls.map(url => paramorph.loadContent(url)))
      .then(() => this.resolve(pathname, container))
    ;
  }

  private resolve(pathname : string, container : HTMLElement) : Promise<void> {
    const { router, history, pathParams, paramorph } = this;

    return router.resolve(pathname)
      .then(async post => {
        const props = { history, pathParams, paramorph, post, requestParameterizedRender };
        const layout = paramorph.layouts[post.layout] as Layout;

        const LayoutComponent = await paramorph.loadLayout(post.layout);
        const PostComponent = await paramorph.loadContent(post.url);

        const postElem = React.createElement(PostComponent);
        const layoutElem = React.createElement(LayoutComponent, {}, postElem);
        const appElem = React.createElement(ContextContainer, props, layoutElem);

        return new Promise<void>((resolve, reject) => {
          ReactDom.hydrate(appElem, container, () => resolve());
        });
      })
    ;
  }
}

export default ClientRenderer;

function requestParameterizedRender() {
  // no op on client side
}

