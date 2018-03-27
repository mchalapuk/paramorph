
import { Config } from '../config';
import { Page, Layout, Include } from '.';

export class Paramorph {
  readonly layouts : HashMap<Layout> = {};
  readonly includes : HashMap<Include> = {};
  readonly pages : HashMap<Page> = {};
//  readonly categories : HashMap<Category> = {};

  constructor(readonly config : Config) {
  }

  addLayout(layout : Layout) {
    this.layouts[layout.name] = layout;
  }
  addInclude(include : Include) {
    this.includes[include.name] = include;
  }
  addPage(page : Page) {
    this.pages[page.url] = page;
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

