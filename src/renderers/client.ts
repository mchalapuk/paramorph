
import { createElement, Component, ComponentType, Children } from 'react';
import { render } from 'react-dom';
import { UniversalRouter, Route, Context } from '../router';
import { History, createBrowserHistory } from 'history';

import { ContextContainer } from './ContextContainer';
import { Paramorph, Page } from '../model';

export class ClientRenderer {
  constructor(
    private history : History,
    private router : UniversalRouter<Context, ComponentType<any>>,
    private paramorph : Paramorph
  ) {
  }
  render(containerId : string) {
    const container = document.getElementById(containerId);

    const resolve = (page : Page) => {
      this.router.resolve(page.url)
        .then(component => {
          const props = { history: this.history, paramorph: this.paramorph, page };
          const app = createElement(ContextContainer, props, component);
          render(app, container);
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

