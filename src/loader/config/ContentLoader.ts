
import { Paramorph } from '../../model';

export interface ContentLoader {
  load(paramorph : Paramorph) : Promise<void>;
}

export default ContentLoader;

