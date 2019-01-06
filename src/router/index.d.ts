
import pathToRegexp = require('path-to-regexp');

export class Router<C = {}> {
  constructor(routes: Route<C>[] | Route<C>, options?: Options<C>);

  resolve(pathnameOrContext: string | PathnameContext): Promise<PageComponents>;

  static pathToRegexp: typeof pathToRegexp;
}

export default Router;

export interface Params {
  [_: string]: any;
}
export interface Context {
  [_: string]: any;
}

export interface PathnameContext extends Context {
  pathname: string;
}

export interface ActionContext<C> extends PathnameContext {
  router: Router<C>;
  route: Route<C>;
  next: (resume?: boolean, parent?: Route, prevResult?: any) => Promise<PageComponents>;
  baseUrl: string;
  path: string;
  params: Params;
  keys: pathToRegexp.Key[];
}

export interface Route<C = {}> {
  path?: string | RegExp | Array<string | RegExp>;
  name?: string;
  parent?: Route<C> | null;
  children?: Route[] | null;
  action?: (context: ActionContext<C> & C) => Promise<PageComponents>;
}

export interface PageComponents {
  LayoutComponent : React.ComponentType<{}>;
  PageComponent : React.ComponentType<{}>;
}

export interface Options<C = {}> {
  context?: C;
  baseUrl?: string;
  resolveRoute?: (context: ActionContext<C> & C, params: Params) => any;
  errorHandler?: (error: Error & { context: C, code: number }) => any;
}

