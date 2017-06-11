import { createElement } from 'react';
import { render } from 'react-dom';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StaticRouter, BrowserRouter, Switch } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './Root';
import routes from './routes';
import website from './data';

const serverRender = (locals : any) => {
  // site skeleton rendered without react ids
  const tags = (website.pages[locals.path] || { tags: [] }).tags;
  const root = createElement(Root, Object.assign(locals, { tags }));
  const html = renderToStaticMarkup(root);

  // react root contents rendered with react ids
  const child = createElement(Switch, {}, routes);
  const router = createElement(StaticRouter, { location: locals.path, context: {}}, child);
  const body = renderToString(router);

  // everything together
  return '<!DOCTYPE html>\n' + html.replace("%%%BODY%%%", body);
}

const clientRender = () => {
  const container = document.getElementById('root');
  const child = createElement(Switch, {}, routes);
  const router = createElement(BrowserRouter, {}, child);
  const app = createElement(AppContainer, {}, router);
  render(app, container);
}

if (typeof window !== 'undefined') {
  window.addEventListener('load', clientRender);
}

export default serverRender;

if (module.hot) {
  module.hot.accept('./routes', clientRender);
}

