
import * as webpack from 'webpack';
import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import { promisify } from 'util';

import Module = require('module');
import { createMemoryHistory } from 'history';
import * as stripTags from 'striptags';

import { Paramorph, Page, Tag } from '../../model';
import { ContextContainer } from '../../react';

import ContentLoader from './ContentLoader';

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

      Object.defineProperty(page, 'image', {
        get: () => image,
        set: () => { throw new Error('Page.image is readonly'); }
      });
      console.log(`generated pages['${page.url}'].image = '${image}'`);
    }
    if (page.description) {
      return;
    }

    if (page instanceof Tag) {
      const index = paramorph.pages['/'];
      if (index === undefined) {
        throw new Error('coundn\'t find page of url \'/\' (index page)');
      }
      const description = await this.descriptionFromPages(index, page);

      Object.defineProperty(page, 'description', {
        get: () => description,
        set: () => { throw new Error('Page.description is readonly'); },
      });
      console.log(`generated pages['${page.url}'].description = '${description}'`);

    } else {
      const description = removeEntities(stripTags(html));

      Object.defineProperty(page, 'description', {
        get: () => description,
        set: () => { throw new Error('Page.description is readonly'); },
      });
      console.log(`generated pages['${page.url}'].description = '${description}'`);
    }
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

  private descriptionFromPages(index : Page, page : Tag) {
    return removeEntities(`${index.title} ${page.title}: ${page.pages.map(p => p.title).join(', ')}`);
  }

  private exec(source : string, url : string) {
    const module = new Module(url, this.context as any);
    module.paths = (Module as any)._nodeModulePaths(this.context.context);
    module.filename = url;
    (module as any)._compile(source, url);

    return module.exports.default;
  }

  private validateDescriptions(paramorph : Paramorph) {
    const pages = Object.keys(paramorph.pages)
      .map(key => paramorph.pages[key] as Page);
    const missingDescription = pages
      .filter(p => p.description === '' && p.output)
      .map(p => p.url)
    ;
    if (missingDescription.length !== 0) {
      throw new Error(`Description missing in pages ${
        JSON.stringify(missingDescription)
      }. Write some text in the article or add \'description\' field.`);
    }
  }
}

export default FullContentLoader;

function removeEntities(str : string) {
  return str
    .replace(/&#x22;/g, '\"')
    .replace(/&#x27;/g, '\'')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[^\s;]+;/g, '')
  ;
}
