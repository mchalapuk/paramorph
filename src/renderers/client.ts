
import { createElement, Component, ComponentType, Children } from 'react';
import { render } from 'react-dom';
import { UniversalRouter, Route, Context } from '../router';
import { createBrowserHistory } from 'history';

import { ContextContainer } from './ContextContainer';
import { Paramorph, Page } from '../model';

export class ClientRenderer {
  render(containerId : string, paramorph : Paramorph, routes : Route[]) {
    const container = document.getElementById(containerId);

    const router = new UniversalRouter<Context, ComponentType<any>>(routes);
    const history = createBrowserHistory();

    function resolve(page : Page) {
      router.resolve(page.url)
        .then(component => {
          const app = createElement(ContextContainer, { history, paramorph, page }, component);
          render(app, container);
        });
    }

    const { pages } = paramorph;
    const notFound = pages['/404'] as Page;

    const unlisten = history.listen(location => resolve(pages[location.pathname] || notFound));
    window.addEventListener('unload', unlisten);

    const initialPage = pages[history.location.pathname] || notFound;
    resolve(initialPage);
  }
}

export default ClientRenderer;

