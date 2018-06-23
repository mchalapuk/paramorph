import { createElement, ReactElement } from 'react';
import { Route, Params, Context } from 'universal-router';

import { Paramorph, Page, ComponentType } from './model';

const NOT_FOUND_URL = '/404';

export interface PageWithRoute {
  page : Page;
  route : Route;
}

export class RoutesFactory {
  getRoutes(paramorph : Paramorph) : PageWithRoute[] {
    var error404 = paramorph.pages[NOT_FOUND_URL];
    if (error404 === undefined) {
      throw new Error(`couldn't find page of url ${NOT_FOUND_URL}`);
    }

    function createRoute(page : Page, path = page.url) : PageWithRoute {
      return {
        page,
        route: {
          path,
          action: async (context : Context, params : Params) => {
            const layout = await paramorph.loadLayout(page.layout);
            const component = await paramorph.loadPage(path);
            return (() => createElement(layout, { component, page, paramorph })) as ComponentType;
          },
        },
      };
    }

    const routes = Object.keys(paramorph.pages)
      .map(url => paramorph.pages[url] as Page)
      .filter(page => page.output)
      .map(page => createRoute(page))
    ;
    // 404 (must be at the end)
    createRoute(error404, '/:anything');

    return routes;
  }
};

export default RoutesFactory;

