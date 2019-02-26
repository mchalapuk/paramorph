
import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import { History, createMemoryHistory } from 'history';
import Module = require('module');

import {
  Config,
  CollectionConfig,
  Paramorph,
  Layout,
  Include,
  Page,
  Collection,
  Tag,
  Category,
} from '../../model';

import SourceFile from './SourceFile';
import ProjectStructure, { SpecialDirs } from './ProjectStructure';
import FrontMatter from './FrontMatter';
import PageFactory from './PageFactory';
import TagFactory from './TagFactory';
import ContentLoader from './ContentLoader';

const TAG_PAGE_URL = '/tag';

export class ConfigLoader {
  constructor(
    private structure : ProjectStructure,
    private frontMatter : FrontMatter,
    private pageFactory : PageFactory,
    private contentLoader : ContentLoader,
  ) {
  }

  async load(config : Config) : Promise<Paramorph> {
    const paramorph = new Paramorph(config);

    const specialDirs = await this.structure.scan(config);
    specialDirs.layouts.forEach(file => paramorph.addLayout(new Layout(file.name, file.path)));
    specialDirs.includes.forEach(file => paramorph.addInclude(new Include(file.name, file.path)));

    const collectionFileTuples : { file : SourceFile, collection : Collection }[] = [];
    specialDirs.collections.forEach(dir => {
      const { name, path } = dir;
      const cfg = config.collections[name] || {} as CollectionConfig;

      const collection = new Collection(name, cfg.title || toTitle(name), path, cfg.layout, cfg.output);
      paramorph.addCollection(collection);

      dir.files.forEach(file => collectionFileTuples.push({ file, collection }));
    });

    // TODO queue + limited number of workers?
    await Promise.all(
      collectionFileTuples.map(async ({ collection, file }) => {
        const matter = await this.frontMatter.read(file);
        const page = this.pageFactory.create(file, collection, matter);
        paramorph.addPage(page);
      }),
    );

    this.addTags(paramorph);
    this.addPagesToCategories(paramorph);

    await this.contentLoader.load(paramorph);
    return paramorph;
  }

  private addTags(paramorph : Paramorph) {
    const tagPage = paramorph.pages[TAG_PAGE_URL] as Tag;
    if (!tagPage) {
      throw new Error(`Couldn't find page of url '${TAG_PAGE_URL}' (used to render tag pages)`);
    }
    const tagFactory = new TagFactory(tagPage);

    Object.keys(paramorph.pages)
      .forEach(key => {
        const page = paramorph.pages[key] as Page;

        page.tags.forEach(title => {
          const tag = tagFactory.create(title);

          if (!paramorph.pages.hasOwnProperty(tag.url)) {
            paramorph.addPage(tag);
          }
          tag.pages.push(page);
        });
      })
    ;
  }

  private addPagesToCategories(paramorph : Paramorph) {
    const missing = [] as { page : string, category : string }[];

    Object.keys(paramorph.pages)
      .forEach(key => {
        const page = paramorph.pages[key] as Page;

        page.categories.forEach(title => {
          if (!paramorph.categories.hasOwnProperty(title)) {
            missing.push({ page: page.url, category: title });
            return;
          }
          const category = paramorph.categories[title] as Category;
          category.pages.push(page);
        });
      })
    ;

    if (missing.length !== 0) {
      throw new Error(`Couldn't find category page(s): ${JSON.stringify(missing)}`);
    }
  }
}

export default ConfigLoader;

function toTitle(name : string) {
  return name.substring(0, 1).toUpperCase() + name.substring(1);
}

