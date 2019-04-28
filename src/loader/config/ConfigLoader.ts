
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
  Post,
  Collection,
  Tag,
  Category,
} from '../../model';

import SourceFile from './SourceFile';
import ProjectStructure, { SpecialDirs } from './ProjectStructure';
import FrontMatter from './FrontMatter';
import PostFactory from './PostFactory';
import TagFactory from './TagFactory';
import ContentLoader from './ContentLoader';

const TAG_PAGE_URL = '/tag/';

export class ConfigLoader {
  constructor(
    private structure : ProjectStructure,
    private frontMatter : FrontMatter,
    private postFactory : PostFactory,
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
        const post = this.postFactory.create(file, collection, matter);
        paramorph.addPost(post);
      }),
    );

    this.addTags(paramorph);
    this.addPostsToCategories(paramorph);

    await this.contentLoader.load(paramorph);
    return paramorph;
  }

  private addTags(paramorph : Paramorph) {
    const tagPost = paramorph.posts[TAG_PAGE_URL] as Tag;
    if (!tagPost) {
      throw new Error(`Couldn't find post of url '${TAG_PAGE_URL}' (required for rendering of tag pages)`);
    }
    const tagFactory = new TagFactory(tagPost);

    Object.keys(paramorph.posts)
      .forEach(key => {
        const post = paramorph.posts[key] as Post;

        post.tags.forEach(title => {
          const tag = tagFactory.create(title);

          if (!paramorph.posts.hasOwnProperty(tag.url)) {
            paramorph.addPost(tag);
          }
          tag.posts.push(post);
        });
      })
    ;
  }

  private addPostsToCategories(paramorph : Paramorph) {
    const missing = [] as { post : string, category : string }[];

    Object.keys(paramorph.posts)
      .forEach(key => {
        const post = paramorph.posts[key] as Post;

        post.categories.forEach(title => {
          if (!paramorph.categories.hasOwnProperty(title)) {
            missing.push({ post: post.url, category: title });
            return;
          }
          const category = paramorph.categories[title] as Category;
          category.posts.push(post);
        });
      })
    ;

    if (missing.length !== 0) {
      throw new Error(`Couldn't find category post(s): ${JSON.stringify(missing)}`);
    }
  }
}

export default ConfigLoader;

function toTitle(name : string) {
  return name.substring(0, 1).toUpperCase() + name.substring(1);
}

