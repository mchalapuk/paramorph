
import { Post } from '.';

export class Tag extends Post {
  readonly originalTitle : string;
  readonly posts : Post[] = [];

  constructor(
    permalink : string,
    title : string,
    description : string,
    image : string | null,
    layout : string,
    source : string,
    output : boolean,
    limit : number,
    timestamp : number,
  ) {
    super(
      permalink,
      `#${title}`,
      description,
      image,
      "_tags",
      layout,
      source,
      output,
      false,
      limit,
      [],
      [],
      timestamp
    );
    this.originalTitle = title;
  }
}

export default Tag;

