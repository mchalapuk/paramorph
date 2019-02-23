
import Page from './Page';

export class Collection {
  readonly pages : Page[] = [];

  constructor(
    readonly name : string,
    readonly title : string,
    readonly path : string,
    readonly layout ?: string,
    readonly output ?: boolean,
    readonly limit ?: number,
  ) {
  }
}

export default Collection;

