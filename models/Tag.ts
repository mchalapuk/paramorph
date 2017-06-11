
import Page from './Page';

export default class Tag {
  title : string;
  pages : Page[] = [];

  constructor(title : string) {
    this.title = title;
  }
}

