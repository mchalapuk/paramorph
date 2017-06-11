import { createElement, ComponentClass, StatelessComponent, Attributes } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Route, StaticRouter } from 'react-router-dom';

import website from './data';
import { Website, Page, Layout } from './models';

type ComponentType<T> = ComponentClass<T> | StatelessComponent<T>;

const NOT_FOUND_URL = '/404';

let key = 0;

function createRoute(page : Page, exact = true) {
  const component = () => createElement(page.layout.component as any, { website, page });
  const routeProps = { path: page.url, exact, key: key++, component };
  const route = createElement(Route, routeProps);
  return route;
}

const routes = [].concat.call(
  // categories
  Object.keys(website.categories)
    .map((url) => createRoute(website.categories[url])),

  // pages
  Object.keys(website.pages)
    .map((url) => createRoute(website.pages[url])),
);

var error404 = website.pages[NOT_FOUND_URL];
if (error404 == undefined) {
  throw new Error(`couldn't find page of url ${NOT_FOUND_URL}`);
}

// not found page
routes.push(
  createRoute(new Page(
    error404.title,
    '/',
    error404.layout,
    error404.body,
    error404.date,
    error404.categories,
    error404.tags
  ), false)
);

export default routes;

