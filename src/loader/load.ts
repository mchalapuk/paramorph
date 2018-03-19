import { Config } from '../config';
import { Paramorph } from '../model';
import { FileSystem } from '../platform/node/FileSystem';

import { ProjectStructure } from './ProjectStructure';

const fs = new FileSystem();

export function load(config : Config) : Promise<Paramorph> {
  const paramorph = new Paramorph(config);
  const structure = new ProjectStructure(fs);

  return structure.scan(config)
    .then(specialDirs => {
      console.log(specialDirs);
      return paramorph;
    });
}

export default load;

