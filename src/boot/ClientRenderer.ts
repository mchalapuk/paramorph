
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
    const notFound = pages['/404'] as Page;

    const unlisten = this.history.listen(location => resolve(pages[location.pathname] || notFound));
    window.addEventListener('unload', unlisten);

    const initialPage = pages[this.history.location.pathname] || notFound;

    // Need to wait for loaders added in .componentWillMount methods
    // (same as server-side) in order to hydrate initial page without a warning.
    this.preloadData(initialPage)
      .then(() => resolve(initialPage))
    ;
  }

  private async preloadData(page : Page) {
    const { history, paramorph } = this;
    const promises : Promise<any>[] = [];

    const oldLoadData = paramorph.loadData;
    paramorph.loadData = <T>(key : string, loader : () => Promise<T>) => {
      promises.push(loader().then(value => paramorph.data[key] = value));
      // Returning never-resolving promise as components
      // would already be unmounted when resolved.
      return new Promise(() => {});
    };

    const { PageComponent } = await this.router.resolve(page.url);
    const pageElement = React.createElement(PageComponent);
    const props = { history, paramorph, page };
    const app = React.createElement(ContextContainer, props, pageElement);

    ReactDomServer.renderToString(app);
    paramorph.loadData = oldLoadData;

    await Promise.all(promises);
  }
}

export default ClientRenderer;

