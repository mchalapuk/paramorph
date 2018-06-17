
import { Config } from '../config';
import { Paramorph, Layout, Include, Page } from '../model';

import { ProjectStructure, SpecialDirs, SourceFile } from './ProjectStructure';
import { FrontMatter } from './FrontMatter';
import { PageFactory } from './PageFactory';
import { TagFactory } from './TagFactory';

const TAG_PAGE_URL = '/tag';

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

    const collectionFileTuples = this.getCollectionFileTuples(specialDirs);
    // TODO queue + limited number of workers?
    await Promise.all(
      collectionFileTuples.map(async ({ collection, file }) => {
        const matter = await this.frontMatter.read(file);
        const page = this.pageFactory.create(file, collection, matter);
        paramorph.addPage(page);
      }),
    );

    this.addTags(paramorph);
    this.validateCategories(paramorph);
    return paramorph;
  }

  private getCollectionFileTuples(specialDirs : SpecialDirs) {
    return [].concat.apply(
      [],
      Object.keys(specialDirs.collections)
        .map(collection => {
          const sourceFiles = specialDirs.collections[collection] as SourceFile[];
          return sourceFiles.map(file => ({ file, collection }));
        })
    ) as { file : SourceFile, collection : string }[];
  }

  private addTags(paramorph : Paramorph) {
    const pages = Object.keys(paramorph.pages)
      .map(key => paramorph.pages[key] as Page);

    const tagPage = paramorph.pages[TAG_PAGE_URL];
    if (!tagPage) {
      throw new Error(`Couldn't find page of url '${TAG_PAGE_URL}' (used to render tag pages)`);
    }
    const tagFactory = new TagFactory(tagPage);

    pages.forEach(page => {
      page.tags.forEach(title => {
        const tag = tagFactory.create(title);

        if (paramorph.pages.hasOwnProperty(tag.url)) {
          // In case there is a separately defined page for this tag.
          return;
        }
        paramorph.addPage(tag);
      });
    });
  }

  private validateCategories(paramorph : Paramorph) {
    const pages = Object.keys(paramorph.pages)
      .map(key => paramorph.pages[key] as Page);

    const missing = [] as { page : string, category : string }[];

    pages.forEach(page => {
      page.categories.forEach(category => {
        if (!paramorph.categories.hasOwnProperty(category)) {
          missing.push({ page: page.url, category });
        }
      });
    });

    if (missing.length !== 0) {
      throw new Error(`Couldn't find category page(s): ${JSON.stringify(missing)}`);
    }
  }
}

export default Loader;

