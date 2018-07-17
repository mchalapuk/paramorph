import { createElement, ReactElement } from 'react';

import { Route } from './router';
import { Paramorph, Page, ComponentType } from './model';

const NOT_FOUND_URL = '/404';

export class RoutesFactory {
  getRoutes(paramorph : Paramorph) : Route[] {
    var error404 = paramorph.pages[NOT_FOUND_URL];
    if (error404 === undefined) {
      throw new Error(`couldn't find page of url ${NOT_FOUND_URL}`);
    }

    function createRoute(page : Page, path = page.url) : Route {
      return {
        path,
        action: async () => {
          const layout = await paramorph.loadLayout(page.layout);
          const component = await paramorph.loadPage(page.url);
          return (() => createElement(layout, { component, page, paramorph })) as ComponentType;
        },
      };
    }

    const routes = Object.keys(paramorph.pages)
      .map(url => paramorph.pages[url] as Page)
      .filter(page => page.output)
      .map(page => createRoute(page))
    ;
    // 404 (must be at the end)
    routes.push(createRoute(error404, '/:anything'));

    return routes;
  }
};

export default RoutesFactory;

