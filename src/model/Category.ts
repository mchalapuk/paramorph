
import { Page } from '.';

export class Category extends Page {
  readonly pages : Page[] = [];

  constructor(
    url : string,
    title : string,
    description : string,
    image : string | null,
    layout : string,
    source : string,
    output : boolean,
    feed : boolean,
    categories : string[],
    tags : string[],
    timestamp : number,
  ) {
    super(url, title, description, image, layout, source, output, feed, categories, tags, timestamp);
  }
}

export default Category;

