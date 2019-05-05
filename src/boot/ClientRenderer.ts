
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as ReactDomServer from 'react-dom/server';
import { History, createBrowserHistory } from 'history';

import { Router } from '../boot';
import { ContextContainer } from '../react';
import { Paramorph, Post, PathParams } from '../model';

export class ClientRenderer {
  constructor(
    private readonly history : History,
    private readonly pathParams : PathParams,
    private readonly router : Router,
    private readonly paramorph : Paramorph
  ) {
  }

  render(container : HTMLElement, preloadUrls : string[]) : Promise<void> {
    const { history, paramorph } = this;
    const { posts } = paramorph;
    const notFound = posts['/404/'] as Post;

    const unlisten = history.listen(location => {
      this.resolve(posts[location.pathname] || notFound, container);
    });
    // window.addEventListener('unload', unlisten);

    const initialPost = posts[history.location.pathname] || notFound;

    // We need to wait for content from paramorph-preload meta tags to be loaded
    // (same as server-side) in order to hydrate initial post without a warning.
    return this.preloadContent(preloadUrls)
      .then(() => this.resolve(initialPost, container))
    ;
  }

  private resolve(post : Post, container : HTMLElement) : Promise<void> {
    const { router, history, pathParams, paramorph } = this;

    return router.resolve(post.url)
      .then(({ PostComponent, LayoutComponent }) => {
        const postElement = React.createElement(PostComponent);
        const layoutElement = React.createElement(LayoutComponent, {}, postElement);

        const props = { history, pathParams, paramorph, post, requestParameterizedRender };
        const app = React.createElement(ContextContainer, props, layoutElement);

        return new Promise((resolve, reject) => {
          ReactDom.hydrate(app, container, () => resolve());
        });
      })
    ;
  }

  private async preloadContent(preloadUrls : string[]) {
    const { paramorph } = this;

    return Promise.all(preloadUrls.map(url => paramorph.loadContent(url)));
  }
}

export default ClientRenderer;

function requestParameterizedRender() {
  // no op on client side
}

