
import { createElement, Component, Children } from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter, Switch } from 'react-router-dom';

import { PageWithRoute } from '../route-factory';

export class ClientRenderer {
  render(containerId : string, routes : PageWithRoute[]) {
    const container = document.getElementById(containerId);
    const child = createElement(Switch, {}, routes.map(e => e.route));
    const router = createElement(BrowserRouter, {}, child);
    const app = createElement(AppContainer, {}, router);
    render(app, container);
  }
}

export default ClientRenderer;

