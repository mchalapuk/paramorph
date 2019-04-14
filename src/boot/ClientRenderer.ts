
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as ReactDomServer from 'react-dom/server';
import { History, createBrowserHistory } from 'history';

import { Router } from '../boot';
import { ContextContainer } from '../react';
import { Paramorph, Page } from '../model';

export class ClientRenderer {
  constructor(
    private history : History,
    private router : Router,
    private paramorph : Paramorph
  ) {
  }
  render(containerId : string) {
    const container = document.getElementById(containerId);
    const { history, paramorph } = this;

    const resolve = (page : Page) => {
      this.router.resolve(page.url)
        .then(({ PageComponent, LayoutComponent}) => {
          const pageElement = React.createElement(PageComponent);
          const layoutElement = React.createElement(LayoutComponent, {}, pageElement);

          const props = { history, paramorph, page };
          const app = React.createElement(ContextContainer, props, layoutElement);
          ReactDom.hydrate(app, container);
        });
    };

    const { pages } = this.paramorph;
    const notFound = pages['/404/'] as Page;

    const unlisten = this.history.listen(location => resolve(pages[location.pathname] || notFound));
    window.addEventListener('unload', unlisten);

    const initialPage = pages[location.pathname] || notFound;

    // We need to wait for content from paramorph-preload meta tags to be loaded
    // (same as server-side) in order to hydrate initial page without a warning.
    this.preloadContent()
      .then(() => resolve(initialPage))
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
        if (url in paramorph.pages) {
          return true;
        }
        console.error(`unknown url found in paramorph-preload meta tag: ${url}`);
        return false;
      })
    ;
  }
}

export default ClientRenderer;

