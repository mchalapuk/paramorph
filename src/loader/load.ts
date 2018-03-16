import { Config } from '../config';
import { Paramorph } from '../model';

export function load(config : Config) : Promise<Paramorph> {
  const paramorph = new Paramorph(config);


  return Promise.resolve(paramorph);
}

export default load;

