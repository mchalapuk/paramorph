import Page, { ComponentType } from './Page';
import Layout from './Layout';

export default class Tag extends Page {
  originalTitle : string;
  pages : Page[] = [];

  constructor(title : string, url : string, layout : Layout, body : ComponentType<any>) {
    super('#'+ title, '', url, layout, body, null, true, new Date(Date.UTC(0, 0)), [], [], false);
    this.originalTitle = title;
  }
}

