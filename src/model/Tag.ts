
import { Page } from '.';

export class Tag extends Page {
  readonly originalTitle : string;
  readonly pages : Page[] = [];

  constructor(
    title : string,
    description : string,
    image : string | null,
    layout : string,
    source : string,
    output : boolean,
    timestamp : number,
  ) {
    super(
      `/tags/${title}`,
      `#${title}`,
      description,
      image,
      "_tags",
      layout,
      source,
      output,
      false,
      [],
      [],
      timestamp
    );
    this.originalTitle = title;
  }
}

export default Tag;

