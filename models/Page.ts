import { ComponentClass, StatelessComponent } from 'react';

import Layout from './Layout';
import Website from './Website';

export type ComponentType<T> = ComponentClass<T> | StatelessComponent<T>;

export class Page {
  title : string;
  url : string;
  layout : Layout;
  body : ComponentType<any>;
  output : boolean;
  date : string | null;
  categories : string[];
  tags : string[];

  constructor(title : string, url : string, layout : Layout, body : ComponentType<any>,
    output : boolean, date : string | null, categories : string[], tags : string[]) {
    this.title = title;
    this.url = url;
    this.layout = layout;
    this.body = body;
    this.output = output;
    this.date = date;
    this.categories = categories;
    this.tags = tags;
  }

  getCrumbs(website : Website) : Page[][] {
    if (this.url == '/') {
      return  [ [ this ] ];
    }
    if (this.categories.length == 0) {
      return [ [ website.getPageOfUrl('/'), this ] ];
    }

    return this.categories.map((categoryTitle : string) => {
      return website.getCategoryOfTitle(categoryTitle)
        .getCrumbs(website)
        .map((crumb : Page[]) => crumb.concat([ this ]));
    }).reduce((a : Page[][], b : Page[][]) => a.concat(b), []);
  }
}

export default Page;

