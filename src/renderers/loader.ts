
import { ComponentType, ReactElement, createElement } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { History } from 'history';
import { Script } from 'vm';

import { Paramorph, Page } from '../model';
import { ContextContainer } from './ContextContainer';

export class LoaderRenderer {
  constructor(
    private history : History,
    private paramorph : Paramorph,
    private loadPage : (request : string, callback : LoadCallback) => void,
  ) {
  }

  async render(page : Page) : Promise<string> {
    const request = `@website${page.source.substring(1)}`;
    const component = await this.loadComponent(request);
    const element = createElement(component, { respectLimit: false });

    const props = {
      history: this.history,
      paramorph: this.paramorph,
      page,
    };
    const container = createElement(ContextContainer, props, element);

    return renderToStaticMarkup(element);
  }

  private loadComponent(request : string) : Promise<ComponentType> {
    return new Promise((resolve, reject) => {
      this.loadPage(request, (err, source, sourceMap, module) => {
        if (err) {
          reject(err);
        }
        const componentModule = this.eval(request, source);
        if (!componentModule.hasOwnProperty('default')) {
          reject(new Error(`Module '${request} must contain a default export...'`));
        }
        resolve(componentModule.default);
      });
    });
  }

  private eval(filename : string, source : string) {
    const sandbox = {} as any;

    const exports = {} as any;
    sandbox.exports = exports;

    sandbox.module = {
      exports: exports,
      filename: filename,
      id: filename,
      parent: module.parent,
      require: sandbox.require || requireLike(filename),
    };
    sandbox.global = sandbox;

    const options = {
      filename: filename,
      displayErrors: true,
    }

    const script = new vm.Script(source, options);
    script.runInNewContext(sandbox, options)

    return sandbox.module.exports;
  }
}

export default LoaderRenderer;

export type LoadeCallback = (
  err : any,
  source: string,
  sourceMap : string,
  module : NormalModule,
) => void;

