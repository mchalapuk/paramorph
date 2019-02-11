
import * as webpack from 'webpack';
import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';

import Module = require('module');
import { createMemoryHistory } from 'history';
import * as stripTags from 'striptags';

import { Paramorph, Page, Tag } from '../../model';
import { ContextContainer } from '../../react';

import ContentLoader from './ContentLoader';

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
    return new Promise((resolve, reject) => {
      const moduleName = `@website${page.source.substring(1)}`;
      this.context.resolve(this.context.context, moduleName, (err, pageUrl) => {
        if (err) {
          this.context.emitError(err);
          reject(err);
          return;
        }

        this.context.loadModule(pageUrl, (err, pageSource) => {
          if (err) {
            this.context.emitError(err);
            reject(err);
            return;
          }

          this.loadPage0(pageSource, page, paramorph)
            .then(
              () => resolve(),
              err => {
                this.context.emitError(err);
                reject(err);
              },
            )
          ;
        });
      });
    });
  }

  private async loadPage0(pageSource : string, page : Page, paramorph : Paramorph) {
    const PageComponent = this.exec(pageSource, page.url);
    const html = this.render(PageComponent, page, paramorph);

    if (!page.image) {
      const image = this.imageFromContent(html, page);

      Object.defineProperty(page, 'image', {
        get: () => image,
        set: () => { throw new Error('Page.image is readonly'); }
      });
    }
    if (!page.description) {
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
      } else {
        const description = stripTags(html);

        Object.defineProperty(page, 'description', {
          get: () => description,
          set: () => { throw new Error('Page.description is readonly'); },
        });
      }
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
      this.context.emitWarning(`Couldn't find image on page ${page.url}; page.image is null`);
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
      .map(p => p.title)
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
    .replace(/&nbsp;/g, ' ')
    .replace(/&[^\s;]+;/g, '')
  ;
}

