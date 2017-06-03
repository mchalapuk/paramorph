import { createElement, ComponentClass, StatelessComponent, Attributes } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Route, StaticRouter } from 'react-router-dom';

import config from './config';
import { CurrentPage, Layout } from './models';

type ComponentType<T> = ComponentClass<T> | StatelessComponent<T>;

interface Routable extends CurrentPage {
  exact ?: boolean;
}

const NOT_FOUND_URL = '/404';

let key = 0;

function createRoute(page : Routable) {
  const pageConfig = Object.assign({}, config, { page })

  const component = () => createElement(page.layout.component as any, pageConfig);
  const routeProps = { path: page.url, exact: page.exact != false, key: key++, component };
  const route = createElement(Route, routeProps);
  return route;
}

const routes = [].concat.call(
  // categories
  Object.keys(config.categories)
    .map((url) => createRoute(config.categories[url])),

  // pages
  Object.keys(config.pages)
    .map((url) => createRoute(config.pages[url] as CurrentPage)),
);

var error404 = config.pages[NOT_FOUND_URL];
if (error404 == undefined) {
  throw new Error(`couldn't find page of url ${NOT_FOUND_URL}`);
}

// not found page
routes.push(createRoute(Object.assign({}, error404 as CurrentPage, {
  url: '/',
  exact: false,
  title: 'Not Found',
})));

export default routes;

