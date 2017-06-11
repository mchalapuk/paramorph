
import { Page, ComponentType } from './Page';
import Layout from './Layout';

export default class Category extends Page {
  pages : Page[] = [];

  constructor(title : string, url : string, layout : Layout, body : ComponentType<any>,
    date : string | null, categories : string[], tags : string[]) {
    super(title, url, layout, body, date, categories, tags);
  }
}

