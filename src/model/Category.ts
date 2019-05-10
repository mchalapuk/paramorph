
import { Post } from '.';

export class Category extends Post {
  readonly posts : Post[] = [];

  constructor(
    pathSpec : string,
    title : string,
    description : string,
    image : string | null,
    collection : string,
    layout : string,
    source : string,
    output : boolean,
    feed : boolean,
    limit : number,
    categories : string[],
    tags : string[],
    timestamp : number,
  ) {
    super(
      pathSpec,
      title,
      description,
      image,
      collection,
      layout,
      source,
      output,
      feed,
      limit,
      categories,
      tags,
      timestamp
    );
  }
}

export default Category;

