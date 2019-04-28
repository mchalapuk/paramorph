
import Post from './Post';

export class Collection {
  readonly posts : Post[] = [];

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

