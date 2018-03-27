import { Config } from '../config';
import { Paramorph, Layout, Include } from '../model';
import { FileSystem } from '../platform/node/FileSystem';

import { ProjectStructure } from './ProjectStructure';

const fs = new FileSystem();

export function load(config : Config) : Promise<Paramorph> {
  const paramorph = new Paramorph(config);
  const structure = new ProjectStructure(fs);

  return structure.scan(config)
    .then(specialDirs => {
      specialDirs.layouts.forEach(file => paramorph.addLayout(new Layout(file.name, file.path)));
      specialDirs.includes.forEach(file => paramorph.addLayout(new Include(file.name, file.path)));
      return paramorph;
    });
}

export default load;

