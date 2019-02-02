
import * as React from 'react';

import { Route } from './boot';
import { Paramorph, Page, Layout, ComponentType } from './model';

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
          const layout = paramorph.layouts[page.layout] as Layout;

          const layoutExports = await paramorph.loadLayout(page.layout);
          const pageExports = await paramorph.loadPage(page.url);

          const LayoutComponent = validateDefaultReactExport(layoutExports, layout.path);
          const PageComponent = validateDefaultReactExport(pageExports, page.source);

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

function validateDefaultReactExport(exports : any, url : string) : ComponentType {
  if (exports.default === undefined) {
    throw new Error(`${url} must have a default export`);
  }
  const candidate = exports.default;

  if (React.isValidElement(candidate) && typeof candidate.type === 'function') {
    const got = JSON.stringify(candidate);
    throw new Error(`${url} must have react component as default export; got ${got}`);
  }
  return exports.default;
}

