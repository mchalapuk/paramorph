import { Config } from '../config';
import { Paramorph, Layout, Include, Page } from '../model';

import { ProjectStructure, SourceFile } from './ProjectStructure';
import { FrontMatter } from './FrontMatter';
import { PageFactory } from './PageFactory';

export class Loader {
  constructor(
    private structure : ProjectStructure,
    private frontMatter : FrontMatter,
    private pageFactory : PageFactory
  ) {
  }

  async load(config : Config) : Promise<Paramorph> {
    const paramorph = new Paramorph(config);

    const specialDirs = await this.structure.scan(config)
    specialDirs.layouts.forEach(file => paramorph.addLayout(new Layout(file.name, file.path)));
    specialDirs.includes.forEach(file => paramorph.addInclude(new Include(file.name, file.path)));

    await Promise.all(
      Object.keys(specialDirs.collections)
        .map(collection => {
          const sourceFiles = specialDirs.collections[collection] as SourceFile[];

          return Promise.all(sourceFiles.map(async file => {
            const matter = await this.frontMatter.read(file);
            const page = await this.pageFactory.create(file, collection, matter);
            paramorph.addPage(page);
          }));
        })
    );
    return paramorph;
  }
}

export default Loader;

