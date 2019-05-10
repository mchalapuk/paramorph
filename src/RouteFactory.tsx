
import * as React from 'react';

import { Route, ActionContext } from './boot';
import { Paramorph, Post, Layout, ComponentType, PathParams } from './model';

const NOT_FOUND_URL = '/404/';

export class RoutesFactory {
  getRoutes(paramorph : Paramorph, pathParams : PathParams) : Route[] {
    var error404 = paramorph.posts[NOT_FOUND_URL];
    if (error404 === undefined) {
      throw new Error(`couldn't find post of url ${NOT_FOUND_URL}`);
    }

    function createRoute(post : Post, path = post.pathSpec) : Route {
      return {
        path,
        action: async (context : ActionContext<{}>) => {
          pathParams.set(context.params);

          return post;
        },
      };
    }

    const routes = Object.keys(paramorph.posts)
      .map(url => paramorph.posts[url] as Post)
      .filter(post => post.output)
      .map(post => createRoute(post))
    ;
    // 404 (must be at the end)
    routes.push(createRoute(error404, '/:anything'));

    return routes;
  }
};

export default RoutesFactory;

