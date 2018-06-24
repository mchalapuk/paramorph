
import pathToRegexp = require('path-to-regexp');

export class UniversalRouter<C extends Context = Context, R = any> {
  constructor(routes: Routes<C, R> | Route<C, R>, options?: Options<C>);

  resolve(pathnameOrContext: string | PathnameContext): Promise<R>;

  static pathToRegexp: typeof pathToRegexp;
}

export default UniversalRouter;

export interface Params {
  [_: string]: any;
}
export interface Context {
  [_: string]: any;
}

export interface PathnameContext extends Context {
  pathname: string;
}

export interface ActionContext<C extends Context, R = any> extends PathnameContext {
  router: UniversalRouter<C, R>;
  route: Route;
  next: (resume?: boolean, parent?: Route, prevResult?: any) => Promise<R>;
  baseUrl: string;
  path: string;
  params: Params;
  keys: pathToRegexp.Key[];
}

export interface Route<C extends Context = any, R = any> {
  path?: string | RegExp | Array<string | RegExp>;
  name?: string;
  parent?: Route | null;
  children?: Routes<C, R> | null;
  action?: (context: ActionContext<C, R> & C, params: Params) => R | Promise<R> | void;
}

export type Routes<C extends Context = Context, R = any> = Array<Route<C, R>>;

export interface Options<C extends Context = Context, R = any> {
  context?: C;
  baseUrl?: string;
  resolveRoute?: (context: ActionContext<C, R> & C, params: Params) => any;
  errorHandler?: (error: Error & { context: C, code: number }) => any;
}

