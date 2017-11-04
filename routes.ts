import { createElement, ComponentClass, StatelessComponent, Attributes } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Route, StaticRouter } from 'react-router-dom';

import website from './data';
import { Website, Page, Tag, Layout } from './models';

type ComponentType<T> = ComponentClass<T> | StatelessComponent<T>;

const NOT_FOUND_URL = '/404';

var error404 = website.pages[NOT_FOUND_URL];
if (error404 == undefined) {
  throw new Error(`couldn't find page of url ${NOT_FOUND_URL}`);
}

let key = 0;

function createRoute(page : Page, path = page.url, exact = true) {
  const component = () => createElement(page.layout.component as any, { website, page });
  const routeProps = { path, exact, key: key++, component };
  const route = createElement(Route, routeProps);
  return route;
}

const routes = [].concat.call(
  // categories
  Object.keys(website.categories)
    .map((title) => website.categories[title])
    .filter((category) => category.output)
    .map((category) => createRoute(category)),

  // tags
  Object.keys(website.tags)
    .map((title) => createRoute(website.tags[title])),

  // pages
  Object.keys(website.pages)
    .map((title) => website.pages[title])
    .filter((page) => page.output)
    .map((page) => createRoute(page)),

  // 404 with exact = false (must be at the end)
  [
    createRoute(error404, '/', false),
  ],
);

export default routes;

