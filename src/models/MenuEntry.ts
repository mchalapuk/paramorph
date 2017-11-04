
import Page from './Page';

export default class MenuEntry {
  title : string;
  short : string;
  url : string;
  icon ?: string;

  constructor(title : string, short : string, url : string, icon ?: string) {
    this.title = title;
    this.short = short;
    this.url = url;
    this.icon = icon;
  }
}

