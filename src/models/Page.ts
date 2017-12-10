import { ComponentClass, StatelessComponent } from 'react';

import Layout from './Layout';
import Website from './Website';

export type ComponentType<T> = ComponentClass<T> | StatelessComponent<T>;

export class Page {
  title : string;
  description : string;
  url : string;
  layout : Layout;
  body : any;
  image : string | null;
  output : boolean;
  date : Date;
  categories : string[];
  tags : string[];
  feed : boolean;

  constructor(title : string, description : string, url : string, layout : Layout,
    body : ComponentType<any>, image : string | null, output : boolean, date : Date,
    categories : string[], tags : string[], feed : boolean) {

    this.title = title;
    this.description = description;
    this.url = url;
    this.layout = layout;
    this.body = body as any;
    this.image = image;
    this.output = output;
    this.date = date;
    this.categories = categories;
    this.tags = tags;
    this.feed = feed;
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

  compareTo(another : Page) : -1 | 1 {
    if (this.date === another.date) {
      if (this.title === another.title) {
        return this.url > another.url ? 1 : -1;
      }
      return this.title > another.title ? 1 : -1;
    }
    return this.date.getTime() > another.date.getTime() ? 1 : -1;
  }
}

export default Page;

