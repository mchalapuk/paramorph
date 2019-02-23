
import { Paramorph } from '.';

export class Page {
  constructor(
    readonly url : string,
    readonly title : string,
    readonly description : string,
    readonly image : string | null,
    readonly collection : string,
    readonly layout : string,
    readonly source : string,
    readonly output : boolean,
    readonly feed : boolean,
    readonly limit : number,
    readonly categories : string[],
    readonly tags : string[],
    readonly timestamp : number,
  ) {
  }

  compareTo(another : Page) : -1 | 1 {
    if (this.timestamp === another.timestamp) {
      if (this.title === another.title) {
        return this.url > another.url ? 1 : -1;
      }
      return this.title > another.title ? 1 : -1;
    }
    return this.timestamp > another.timestamp ? 1 : -1;
  }
}

export default Page;

