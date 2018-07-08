
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
    private loadSource : (request : string) => Promise<string>,
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

  private async loadComponent(request : string) : Promise<ComponentType<any>> {
    const source = await this.loadSource(request);
    const componentModule = this.eval(request, source);
    if (!componentModule.hasOwnProperty('default')) {
      throw new Error(`Module '${request} must contain a default export...'`);
    }
    return componentModule.default;
  }

  private eval(filename : string, source : string) {
    const sandbox = {} as any;

    const exports = {} as any;
    sandbox.exports = exports;
    sandbox.require = require;

    sandbox.module = {
      exports: exports,
      filename: filename,
      id: filename,
      parent: module.parent,
      require: sandbox.require,
    };
    sandbox.global = sandbox;

    const options = {
      filename: filename,
      displayErrors: true,
    }

    const script = new Script(source, options);
    script.runInNewContext(sandbox, options)

    return sandbox.module.exports;
  }
}

export default LoaderRenderer;

