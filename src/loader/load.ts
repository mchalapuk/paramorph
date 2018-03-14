import { Config } from '../config';
import { Paramorph } from '../model';

export function load(config : Config) : Paramorph {
  const paramorph = new Paramorph(config);

  return paramorph;
}

export default load;

