
import * as webpack from 'webpack';
import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import { promisify } from 'util';

import Module = require('module');
import { createMemoryHistory } from 'history';

import { Paramorph, Page } from '../../model';
import { ContextContainer } from '../../react';

import ContentLoader from './ContentLoader';
import DescriptionGenerator from './DescriptionGenerator';

const TEMPLATE = 'paramorph/loader/markdown/NoDependencyPage.tsx.ejs';

export class FullContentLoader implements ContentLoader {
  private history = createMemoryHistory();

  constructor(
    private context : webpack.loader.LoaderContext,
  ) {
  }

  async load(paramorph : Paramorph) : Promise<void> {
    const urls = Object.keys(paramorph.pages);

    const promises = urls
      .map(url => paramorph.pages[url] as Page)
      .filter(page => (page.output && (!page.description || !page.image)))
      .map(page => this.loadPage(page, paramorph))
    ;
    await Promise.all(promises);

    this.validateDescriptions(paramorph);
  }

  async loadPage(page : Page, paramorph : Paramorph) : Promise<void> {
    const loadModule = promisify(this.context.loadModule.bind(this.context));
    const query = `!markdown-loader?template=${TEMPLATE}!@website${page.source.substring(1)}`;

    await loadModule(query)
      .then((pageSource : string) => {
        return this.loadPage0(pageSource, page, paramorph);
      })
      .catch((err : any) => {
        this.context.emitError(err);
      })
    ;
  }

  private async loadPage0(pageSource : string, page : Page, paramorph : Paramorph) {
    const PageComponent = this.exec(pageSource, page.url);
    const html = this.render(PageComponent, page, paramorph);

    if (!page.image) {
      const image = await this.imageFromContent(html, page);

      if (image) {
        Object.defineProperty(page, 'image', {
          get: () => image,
          set: () => { throw new Error('Page.image is readonly'); }
        });
        console.log(`generated pages['${page.url}'].image = '${image}'`);
      }
    }
    if (!page.description) {
      const generator = new DescriptionGenerator();
      const description = generator.generate(html, page);

      if (description) {
        Object.defineProperty(page, 'description', {
          get: () => description,
          set: () => { throw new Error('Page.description is readonly'); },
        });
        console.log(`generated pages['${page.url}'].description = '${description}'`);
      }
    }
  }

  private exec(source : string, url : string) {
    const module = new Module(url, this.context as any);
    module.paths = (Module as any)._nodeModulePaths(this.context.context);
    module.filename = url;
    (module as any)._compile(source, url);

    return module.exports.default;
  }

  private render(
    PageComponent : React.ComponentType<any>,
    page : Page,
    paramorph : Paramorph,
  ) {
    const { history } = this;

    const pageElement = React.createElement(
      PageComponent,
      { respectLimit: true },
    );
    const container = React.createElement(
      ContextContainer,
      { history, paramorph, page },
      pageElement,
    );

    const html = ReactDomServer.renderToStaticMarkup(container);
    return html;
  }

  private async imageFromContent(html : string, page : Page) {
    const found = /<img[^>]* src="([^"]*)"[^>]*>/.exec(html);
    if (!found) {
      this.context.emitWarning(
        new Error(`Couldn't find image on page ${page.url}; page.image is null`),
      );
      return null;
    }
    return found[1];
  }

  private validateDescriptions(paramorph : Paramorph) {
    const urls = Object.keys(paramorph.pages)
      .map(key => paramorph.pages[key] as Page)
      .filter(p => p.description === '' && p.output)
      .map(p => p.url)
    ;
    if (!urls.length) {
      return;
    }

    urls.forEach(url => {
      this.context.emitError(new Error(`Description missing in page ${
        url}. Write some text on the page or add 'description' field.`));
    });
    throw new Error(`Descriptions of ${urls.length} pages are missing`);
  }
}

export default FullContentLoader;

