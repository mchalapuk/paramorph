import { ComponentClass, StatelessComponent } from 'react';

import Layout from './Layout';
import Category from './Category';

export type ComponentType<T> = ComponentClass<T> | StatelessComponent<T>;

export class Page {
  title : string;
  url : string;
  layout : Layout;
  body : ComponentType<any>;
  date ?: string;
  categories : Category[] = [];

  constructor(title : string, url : string, layout : Layout, body : ComponentType<any>, date ?: string) {
    this.title = title;
    this.url = url;
    this.layout = layout;
    this.body = body;
    this.date = date;
  }
}

export default Page;

