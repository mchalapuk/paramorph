
import { Paramorph } from '../../model';

import ContentLoader from './ContentLoader';

export class EmptyContentLoader implements ContentLoader {
  async load(paramorph : Paramorph) : Promise<void> {
    return;
  }
}

export default EmptyContentLoader;

