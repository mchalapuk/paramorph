
import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import { History, createMemoryHistory } from 'history';
import Module = require('module');

import { Config, CollectionConfig, Paramorph, Layout, Include, Page, Collection, Tag } from '../../model';
import { ContextContainer } from '../../react';

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
    this.validateCategories(paramorph);
    await this.contentLoader.load(paramorph);

    return paramorph;
  }

  private addTags(paramorph : Paramorph) {
    const pages = Object.keys(paramorph.pages)
      .map(key => paramorph.pages[key] as Page);

    const tagPage = paramorph.pages[TAG_PAGE_URL] as Tag;
    if (!tagPage) {
      throw new Error(`Couldn't find page of url '${TAG_PAGE_URL}' (used to render tag pages)`);
    }
    const tagFactory = new TagFactory(tagPage);

    pages.forEach(page => {
      page.tags.forEach(title => {
        const tag = tagFactory.create(title);

        if (!paramorph.pages.hasOwnProperty(tag.url)) {
          paramorph.addPage(tag);
        }
        tag.pages.push(page);
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

export default ConfigLoader;

function toTitle(name : string) {
  return name.substring(0, 1).toUpperCase() + name.substring(1);
}

function removeEntities(str : string) {
  return str
    .replace(/&nbsp;/g, ' ')
    .replace(/&[^\s;]+;/g, '')
  ;
}

