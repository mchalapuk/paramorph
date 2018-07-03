
import { createMemoryHistory } from 'history';

import { Config } from '../config';
import { Paramorph, Layout, Include, Page, Tag } from '../model';
import { LoaderRenderer } from '../renderers';
import { stripTags, removeEntities } from '../utils';

import { ProjectStructure, SpecialDirs, SourceFile } from './ProjectStructure';
import { FrontMatter } from './FrontMatter';
import { PageFactory } from './PageFactory';
import { TagFactory } from './TagFactory';

const TAG_PAGE_URL = '/tag';

export class Loader {
  constructor(
    private structure : ProjectStructure,
    private frontMatter : FrontMatter,
    private pageFactory : PageFactory,
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

    this.validatePages(paramorph);
    this.validateCategories(paramorph);

    this.addTags(paramorph);
    this.generateMissingDescriptions(paramorph);
    this.addDefaultImages(paramorph);

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

  private generateMissingDescriptions(paramorph : Paramorph) {
    const history = createMemoryHistory();
    const renderer = new LoaderRenderer(history, paramorph);

    const pages = Object.keys(paramorph.pages)
      .map(key => paramorph.pages[key] as Page);
    const index = paramorph.pages['/'] as Page;

    pages.forEach((page : Page) => {
      if (page.description || !page.output) {
        return;
      }
      if (page instanceof Tag) {
        Object.defineProperty(page, 'description', {
          get: () => this.descriptionFromPages(index, page),
          set: () => { throw new Error('Page.description is readonly'); },
        });
      } else {
        Object.defineProperty(page, 'description', {
          get: () => this.descriptionFromContent(renderer, page),
          set: () => { throw new Error('Page.description is readonly'); },
        });
      }
    });
  }

  private addDefaultImages(paramorph : Paramorph) {
    const history = createMemoryHistory();
    const renderer = new LoaderRenderer(history, paramorph);

    const pages = Object.keys(paramorph.pages)
      .map(key => paramorph.pages[key] as Page);

    pages.forEach((page : Page) => {
      if (page.image || !page.output) {
        return;
      }
      Object.defineProperty(page, 'image', {
        get: () => this.imageFromContent(renderer, page),
        set: () => { throw new Error('Page.image is readonly'); }
      });
    });
  }

  private descriptionFromContent(renderer : LoaderRenderer, page : Page) {
    return removeEntities(stripTags(renderer.render(page)));
  }

  private descriptionFromPages(index : Page, page : Tag) {
    return removeEntities(`${index.title} ${page.title}: ${page.pages.map(p => p.title).join(', ')}`);
  }

  private imageFromContent(renderer : LoaderRenderer, page : Page) {
    const markup = renderer.render(page);
    const found = /<img[^>]* src="([^"]*)"[^>]*>/.exec(markup);
    if (!found) {
      console.warn(`Couldn't find image on page ${page.url}; page.image is null`);
      return null;
    }
    return found[1];
  }

  private validatePages(paramorph : Paramorph) {
    if (!paramorph.pages.hasOwnProperty('/')) {
      throw new Error('page of url \'/\' must be defined to create index.html');
    }
    if (!paramorph.pages.hasOwnProperty('/404')) {
      throw new Error('page of url \'/404\' must be defined to create error page');
    }

    const pages = Object.keys(paramorph.pages)
      .map(key => paramorph.pages[key] as Page);
    const missingDescription = pages
      .filter(p => p.description === '' && p.output)
      .map(p => p.title)
    ;
    if (missingDescription.length !== 0) {
      throw new Error(`Description missing in pages ${
        JSON.stringify(missingDescription)
      }. Write some text in the article or add \'description\' field.`);
    }
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

