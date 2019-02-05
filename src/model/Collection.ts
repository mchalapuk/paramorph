
import Page from './Page';

export class Collection {
  readonly pages : Page[] = [];

  constructor(
    readonly title : string,
    readonly path : string,
  ) {
  }
}

export default Collection;

