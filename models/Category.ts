
import { Page, CurrentPage, ComponentType } from './CurrentPage';
import Layout from './Layout';

export default class Category extends CurrentPage {
  pages : Page[] = [];

  constructor(title : string, url : string, layout : Layout, body : ComponentType<any>, date ?: string) {
    super(title, url, layout, body, date);
  }
}

