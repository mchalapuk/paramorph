import { createElement, ReactElement } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { Paramorph, Page } from './model';

const NOT_FOUND_URL = '/404';

export interface PageWithRoute {
  page : Page;
  route : ReactElement<RouteProps>;
}

export class RoutesFactory {
  getRoutes(paramorph : Paramorph) : PageWithRoute[] {
    var error404 = paramorph.pages[NOT_FOUND_URL];
    if (error404 === undefined) {
      throw new Error(`couldn't find page of url ${NOT_FOUND_URL}`);
    }

    function createRoute(page : Page, path = page.url, exact = true) : PageWithRoute {
      const component = () => createElement(page.layout.component as any, { paramorph, page });
      const routeProps = { page, path, exact, key: path, component };
      const route = createElement(Route, routeProps);
      return { page, route };
    }

    const routes = Object.keys(paramorph.pages)
      .map(url => paramorph.pages[url])
      .filter(page => page.output)
      .map(page => createRoute(page))
    ;
    // 404 with exact = false (must be at the end)
    createRoute(error404, '/', false);

    return routes;
  }
};

export default RoutesFactory;

