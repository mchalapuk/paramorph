
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
  render(containerId : string) {
    const container = document.getElementById(containerId);
    const { history, pathParams, paramorph } = this;

    const resolve = (post : Post) => {
      this.router.resolve(post.url)
        .then(({ PostComponent, LayoutComponent}) => {
          const postElement = React.createElement(PostComponent);
          const layoutElement = React.createElement(LayoutComponent, {}, postElement);

          const props = { history, pathParams, paramorph, post };
          const app = React.createElement(ContextContainer, props, layoutElement);
          ReactDom.hydrate(app, container);
        });
    };

    const { posts } = this.paramorph;
    const notFound = posts['/404/'] as Post;

    const unlisten = this.history.listen(location => resolve(posts[location.pathname] || notFound));
    window.addEventListener('unload', unlisten);

    const initialPost = posts[location.pathname] || notFound;

    // We need to wait for content from paramorph-preload meta tags to be loaded
    // (same as server-side) in order to hydrate initial post without a warning.
    this.preloadContent()
      .then(() => resolve(initialPost))
    ;
  }

  private async preloadContent() {
    const { paramorph } = this;

    const preload = this.getPreloadUrls();
    return Promise.all(preload.map(url => paramorph.loadContent(url)));
  }

  private getPreloadUrls() {
    const { paramorph } = this;

    const meta = document.getElementsByTagName('meta');

    return Array.from(meta)
      .filter(meta => meta.getAttribute('name') === 'paramorph-preload')
      .map(meta => meta.content)
      .filter(url => {
        if (url in paramorph.posts) {
          return true;
        }
        console.error(`unknown url found in paramorph-preload meta tag: ${url}`);
        return false;
      })
    ;
  }
}

export default ClientRenderer;

