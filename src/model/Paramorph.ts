
import { createElement } from 'react';

import { Config } from '../config';
import { Layout, Include, Page, Category, Tag, ComponentType } from '.';

export class Paramorph {
  readonly layouts : HashMap<Layout> = {};
  readonly includes : HashMap<Include> = {};
  readonly pages : HashMap<Page> = {};
  readonly categories : HashMap<Category> = {};
  readonly tags : HashMap<Category> = {};

  readonly layoutLoaders : HashMap<Promise<ComponentType>> = {};
  readonly includeLoaders : HashMap<Promise<ComponentType>> = {};
  readonly pageLoaders : HashMap<Promise<ComponentType>> = {};

  constructor(readonly config : Config) {
  }

  addLayout(layout : Layout) {
    if (this.layouts.hasOwnProperty(layout.name)) {
      throw new Error(`layout of name ${layout.name} is already set`);
    }
    this.layouts[layout.name] = layout;
  }
  addInclude(include : Include) {
    if (this.includes.hasOwnProperty(include.name)) {
      throw new Error(`include of name ${include.name} is already set`);
    }
    this.includes[include.name] = include;
  }
  addPage(page : Page) {
    if (this.pages.hasOwnProperty(page.url)) {
      throw new Error(`page of url ${page.url} is already set`);
    }

    this.pages[page.url] = page;

    if (page instanceof Category) {
      this.categories[page.title] = page;
    } else if (page instanceof Tag) {
      this.tags[(page as Tag).originalTitle] = page;
    }
  }

  addLayoutLoader(name : string, loader : Promise<ComponentType>) {
    if (this.layoutLoaders.hasOwnProperty(name)) {
      throw new Error(`layout loader for name ${name} is already set`);
    }
    this.layoutLoaders[name] = loader;
  }
  loadLayout(name : string) : Promise<ComponentType> {
    if (this.layoutLoaders.hasOwnProperty(name)) {
      throw new Error(`couldn't find layout loader for path: ${name}`);
    }
    return this.layoutLoaders[name] as Promise<ComponentType>;
  }

  addIncludeLoader(name : string, loader : Promise<ComponentType>) {
    if (this.includeLoaders.hasOwnProperty(name)) {
      throw new Error(`include loader for name ${name} is already set`);
    }
    this.includeLoaders[name] = loader;
  }
  loadInclude(name : string) : Promise<ComponentType> {
    if (this.includeLoaders.hasOwnProperty(name)) {
      throw new Error(`couldn't find include loader for path: ${name}`);
    }
    return this.includeLoaders[name] as Promise<ComponentType>;
  }

  addPageLoader(url : string, loader : Promise<ComponentType>) {
    if (this.pageLoaders.hasOwnProperty(url)) {
      throw new Error(`page loader for url ${url} is already set`);
    }
    this.pageLoaders[url] = loader;
  }
  loadPage(url : string) : Promise<ComponentType> {
    if (this.pageLoaders.hasOwnProperty(url)) {
      throw new Error(`couldn't find page loader for path: ${url}`);
    }
    return this.pageLoaders[url] as Promise<ComponentType>;
  }
/*
  getCrumbs(page : Page) : Page[][] {
    if (page.url == '/') {
      return  [ [ page ] ];
    }
    if (page.categories.length == 0) {
      return [ [ this.getPageOfUrl('/'), page ] ];
    }

    return page.categories.map((categoryTitle : string) => {
      return this.getCrumbs(this.getCategoryOfTitle(categoryTitle))
        .map((crumb : Page[]) => crumb.concat([ this ]));
    }).reduce((a : Page[][], b : Page[][]) => a.concat(b), []);
  }

  private getPageOfUrl(url : string) : Page {
    const page = this.categories[url];
    if (!page) {
      throw new Error(`couldn't find page of url ${url}`);
    }
    return page;
  }

  private getCategoryOfTitle(title : string) : Category {
    const category = this.categories[title];
    if (!category) {
      throw new Error(`couldn't find category of title ${title}`);
    }
    return category;
  }
*/
}

export default Paramorph;

export interface HashMap<T> {
  [key : string] : T | undefined;
}

