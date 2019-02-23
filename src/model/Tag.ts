
import { Page } from '.';

export class Tag extends Page {
  readonly originalTitle : string;
  readonly pages : Page[] = [];

  constructor(
    url : string,
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
      url,
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

