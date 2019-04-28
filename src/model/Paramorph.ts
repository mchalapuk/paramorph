
import * as React from 'react';

import { Config, Layout, Include, Post, Category, Collection, Tag, ComponentType } from '.';

export type Loader = () => Promise<ComponentType>;
export type ContentListener = (url : string, content : ComponentType) => void;

export class Paramorph {
  readonly layouts : HashMap<Layout> = {};
  readonly includes : HashMap<Include> = {};
  readonly posts : HashMap<Post> = {};
  readonly categories : HashMap<Category> = {};
  readonly tags : HashMap<Category> = {};
  readonly collections : HashMap<Collection> = {};

  readonly layoutLoaders : HashMap<Loader> = {};
  readonly includeLoaders : HashMap<Loader> = {};
  readonly contentLoaders : HashMap<Loader> = {};

  readonly content : HashMap<React.ComponentType<{}>> = {};
  readonly contentListeners : ContentListener[] = [];

  constructor(
    readonly config : Config,
  ) {
  }

  addLayout(layout : Layout) {
    if (this.layouts.hasOwnProperty(layout.name)) {
      throw new Error(`layout of name ${layout.name} is already set`);
    }
    this.layouts[layout.name] = layout;
  }
  addInclude(include : Include) {
    if (this.includes.hasOwnProperty(include.name)) {
      throw new Error(`include of name ${include.name} is already set`);
    }
    this.includes[include.name] = include;
  }
  addCollection(collection : Collection) {
    if (this.collections.hasOwnProperty(collection.title)) {
      throw new Error(`collection of title '${collection.title}' is already set`);
    }
    this.collections[collection.title] = collection;
  }
  addPost(post : Post) {
    if (this.posts.hasOwnProperty(post.url)) {
      throw new Error(`post of url ${post.url} is already set`);
    }
    this.posts[post.url] = post;

    if (post instanceof Tag) {
      this.tags[(post as Tag).originalTitle] = post;
      // not adding to collection if the post is a tag
      return;
    }

    const collection = this.collections[post.collection];
    if (!collection) {
      throw new Error(
        `coulnd't find collection of title '${post.collection}' when adding post of url '${post.url}'`
      );
    }
    collection.posts.push(post);

    if (post instanceof Category) {
      this.categories[post.title] = post;
    }
  }

  addLayoutLoader(name : string, loader : Loader) {
    if (this.layoutLoaders.hasOwnProperty(name)) {
      throw new Error(`layout loader for name ${name} is already set`);
    }
    this.layoutLoaders[name] = loader;
  }
  loadLayout(name : string) : Promise<ComponentType> {
    if (!this.layoutLoaders.hasOwnProperty(name)) {
      throw new Error(`couldn't find layout loader for path: ${
        name
      }; available loaders: ${
        JSON.stringify(Object.keys(this.layoutLoaders))
      }`);
    }
    return (this.layoutLoaders[name] as Loader)();
  }

  addIncludeLoader(name : string, loader : Loader) {
    if (this.includeLoaders.hasOwnProperty(name)) {
      throw new Error(`include loader for name ${name} is already set`);
    }
    this.includeLoaders[name] = loader;
  }
  loadInclude(name : string) : Promise<ComponentType> {
    if (!this.includeLoaders.hasOwnProperty(name)) {
      throw new Error(`couldn't find include loader for path: ${
        name
      }; available loaders: ${
        JSON.stringify(Object.keys(this.includeLoaders))
      }`);
    }
    return (this.includeLoaders[name] as Loader)();
  }

  addContentLoader(url : string, loader : Loader) {
    if (this.contentLoaders.hasOwnProperty(url)) {
      throw new Error(`content loader for url ${url} is already set`);
    }
    this.contentLoaders[url] = loader;
  }
  loadContent(url : string) : Promise<ComponentType> {
    if (!this.contentLoaders.hasOwnProperty(url)) {
      throw new Error(`couldn't find content loader for path: ${
        url
      }; available loaders: ${
        JSON.stringify(Object.keys(this.contentLoaders))
      }`);
    }
    const content = this.content[url];
    if (content) {
      // already loaded
      this.notifyContentListeners(url);
      return Promise.resolve(content);
    }
    const loader = this.contentLoaders[url] as Loader;

    return loader()
      .then(content => {
        this.content[url] = content;

        this.notifyContentListeners(url);
        return content;
      })
    ;
  }
  addContentListener(listener : ContentListener) {
    this.contentListeners.push(listener);
  }
  removeContentListener(listener : ContentListener) {
    const index = this.contentListeners.indexOf(listener);
    if (index === -1) {
      throw new Error(`unknown content listener: ${listener}`);
    }
    this.contentListeners.splice(index, 1);
  }

  getCrumbs(post : Post) : Post[][] {
    if (post.url == '/') {
      return  [ [ post ] ];
    }
    if (post.categories.length == 0) {
      return [ [ this.getPostOfUrl('/'), post ] ];
    }

    return post.categories
      .map((categoryTitle : string) => {
        return this.getCrumbs(this.getCategoryOfTitle(categoryTitle))
          .map(crumb => crumb.concat([ post ]))
        ;
      })
      .reduce(
        (a : Post[][], b : Post[][]) => a.concat(b),
        [],
      );
  }

  private getPostOfUrl(url : string) : Post {
    const post = this.posts[url];
    if (!post) {
      throw new Error(`couldn't find post of url ${url}`);
    }
    return post;
  }

  private getCategoryOfTitle(title : string) : Category {
    const category = this.categories[title];
    if (!category) {
      throw new Error(`couldn't find category of title ${title}`);
    }
    return category;
  }

  private notifyContentListeners(url : string) {
    global.setImmediate(() => {
      const content = this.content[url] as React.ComponentType<{}>;
      this.contentListeners.forEach(listener => listener(url, content));
    });
  }
}

export default Paramorph;

export interface HashMap<T> {
  [key : string] : T | undefined;
}

