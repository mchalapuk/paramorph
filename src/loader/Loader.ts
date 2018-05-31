import { Config } from '../config';
import { Paramorph, Layout, Include, Page } from '../model';

import { ProjectStructure, SourceFile } from './ProjectStructure';
import { FrontMatter } from './FrontMatter';

export class Loader {
  constructor(private structure : ProjectStructure, private frontMatter : FrontMatter) {
  }

  load(config : Config) : Promise<Paramorph> {
    return this.structure.scan(config)
      .then(specialDirs => {
        const paramorph = new Paramorph(config);
        specialDirs.layouts.forEach(file => paramorph.addLayout(new Layout(file.name, file.path)));
        specialDirs.includes.forEach(file => paramorph.addInclude(new Include(file.name, file.path)));

        Object.keys(specialDirs.collections).map(name => {
          this.addCollection(paramorph, name, specialDirs.collections[name] as SourceFile[]);
        });
        return paramorph;
      });
  }

  private addCollection(paramorph : Paramorph, name : string, collection : SourceFile[]) {
    collection.forEach(file => paramorph.addPage(this.createPage(file, this.frontMatter.read(file))));
  }

  private createPage(file : SourceFile, metaData : any) : Page {
    // TODO validate metadata and create Page instance
    return null as any as Page;
  }
}

export default Loader;

