
import { Post } from '.';

export class Tag extends Post {
  readonly originalTitle : string;
  readonly posts : Post[] = [];

  constructor(
    pathSpec : string,
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
      pathSpec,
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

