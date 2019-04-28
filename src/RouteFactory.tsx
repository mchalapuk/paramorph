
import * as React from 'react';

import { Route, ActionContext } from './boot';
import { Paramorph, Page, Layout, ComponentType, PathParams } from './model';

const NOT_FOUND_URL = '/404/';

export class RoutesFactory {
  getRoutes(paramorph : Paramorph, pathParams : PathParams) : Route[] {
    var error404 = paramorph.pages[NOT_FOUND_URL];
    if (error404 === undefined) {
      throw new Error(`couldn't find page of url ${NOT_FOUND_URL}`);
    }

    function createRoute(page : Page, path = page.permalink) : Route {
      return {
        path,
        action: async (context : ActionContext<{}>) => {
          const layout = paramorph.layouts[page.layout] as Layout;

          const LayoutComponent = await paramorph.loadLayout(page.layout);
          const PageComponent = await paramorph.loadContent(page.url);
          pathParams.set(context.params);

          return {
            LayoutComponent,
            PageComponent,
          };
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

