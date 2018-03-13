
import { Config } from '../config';

export class Paramorph {
  uneval(varName : string = 'paramorph') : string {
    return `const ${varName} = new Paramorph();`;
  }
}

export function load(config : Config) : Paramorph {
  return new Paramorph();
}

