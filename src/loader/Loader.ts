import { Config } from '../config';
import { Paramorph, Layout, Include } from '../model';

import { ProjectStructure } from './ProjectStructure';

export class Loader {
  constructor(private structure : ProjectStructure) {
  }

  load(config : Config) : Promise<Paramorph> {
    return this.structure.scan(config)
      .then(specialDirs => {
        const paramorph = new Paramorph(config);
        specialDirs.layouts.forEach(file => paramorph.addLayout(new Layout(file.name, file.path)));
        specialDirs.includes.forEach(file => paramorph.addLayout(new Include(file.name, file.path)));
        return paramorph;
      });
  }
}

export default Loader;

