
import { Page, ComponentType } from './Page';
import Layout from './Layout';

export default class Category extends Page {
  pages : Page[] = [];

  constructor(title : string, url : string, layout : Layout, body : ComponentType<any>, date ?: string) {
    super(title, url, layout, body, date);
  }
}

