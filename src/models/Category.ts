
import { Page, ComponentType } from './Page';
import Layout from './Layout';

export default class Category extends Page {
  pages : Page[] = [];

  constructor(title : string, description : string, url : string, layout : Layout,
    body : ComponentType<any>, image : string | null, output : boolean, date : Date,
    categories : string[], tags : string[]) {

    super(title, description, url, layout, body, image, output, date, categories, tags, false);
  }
}

