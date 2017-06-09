import { ComponentClass, StatelessComponent } from 'react';

import Layout from './Layout';

export type ComponentType<T> = ComponentClass<T> | StatelessComponent<T>;

export class Page {
  title : string;
  url : string;
  layout : Layout;
  body : ComponentType<any>;
  date ?: string;
  categories : string[] = [];

  constructor(title : string,  url : string, layout : Layout, body : ComponentType<any>,
    date : string, categories : string[]) {
    this.title = title;
    this.url = url;
    this.layout = layout;
    this.body = body;
    this.date = date;
    this.categories = categories;
  }
}

export default Page;

