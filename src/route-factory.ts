import { createElement, ReactElement } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { Website, Page } from './models';

const NOT_FOUND_URL = '/404';

export interface PageWithRoute {
  page : Page;
  route : ReactElement<RouteProps>;
}

export class RoutesFactory {
  getRoutes(website : Website) : PageWithRoute[] {
    var error404 = website.pages[NOT_FOUND_URL];
    if (error404 === undefined) {
      throw new Error(`couldn't find page of url ${NOT_FOUND_URL}`);
    }

    function createRoute(page : Page, path = page.url, exact = true) : PageWithRoute {
      const component = () => createElement(page.layout.component as any, { website, page });
      const routeProps = { page, path, exact, key: path, component };
      const route = createElement(Route, routeProps);
      return { page, route };
    }

    const routes = [].concat.call(
      // categories
      Object.keys(website.categories)
        .map(title => website.categories[title])
        .filter(category => category.output)
        .map(category => createRoute(category)),

      // tags
      Object.keys(website.tags)
        .map(title => createRoute(website.tags[title])),

      // pages
      Object.keys(website.pages)
        .map(title => website.pages[title])
        .filter(page => page.output)
        .map(page => createRoute(page)),

      // 404 with exact = false (must be at the end)
      [
        createRoute(error404, '/', false),
      ],
    );

    return routes;
  }
};

export default RoutesFactory;

