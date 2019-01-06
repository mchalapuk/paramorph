
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Router } from '../router';
import { History, createBrowserHistory } from 'history';

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
    resolve(initialPage);
  }
}

export default ClientRenderer;

