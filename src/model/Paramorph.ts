
import { Config, Layout, Include, Page, Category, Collection, Tag, ComponentType } from '.';

export type Loader = () => Promise<ComponentType>;
export type DataLoader<T> = () => Promise<T>;

export class Paramorph {
  readonly layouts : HashMap<Layout> = {};
  readonly includes : HashMap<Include> = {};
  readonly pages : HashMap<Page> = {};
  readonly categories : HashMap<Category> = {};
  readonly tags : HashMap<Category> = {};
  readonly collections : HashMap<Collection> = {};

  readonly layoutLoaders : HashMap<Loader> = {};
  readonly includeLoaders : HashMap<Loader> = {};
  readonly pageLoaders : HashMap<Loader> = {};

  readonly data : HashMap<any> = {};

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
  addPage(page : Page) {
    if (this.pages.hasOwnProperty(page.url)) {
      throw new Error(`page of url ${page.url} is already set`);
    }
    this.pages[page.url] = page;

    if (page instanceof Tag) {
      this.tags[(page as Tag).originalTitle] = page;
      // not adding to collection if the page is a tag
      return;
    }

    const collection = this.collections[page.collection];
    if (!collection) {
      throw new Error(
        `coulnd't find collection of title '${page.collection}' when adding page of url '${page.url}'`
      );
    }
    collection.pages.push(page);

    if (page instanceof Category) {
      this.categories[page.title] = page;
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

  addPageLoader(url : string, loader : Loader) {
    if (this.pageLoaders.hasOwnProperty(url)) {
      throw new Error(`page loader for url ${url} is already set`);
    }
    this.pageLoaders[url] = loader;
  }
  loadPage(url : string) : Promise<ComponentType> {
    if (!this.pageLoaders.hasOwnProperty(url)) {
      throw new Error(`couldn't find page loader for path: ${
        url
      }; available loaders: ${
        JSON.stringify(Object.keys(this.pageLoaders))
      }`);
    }
    return (this.pageLoaders[url] as Loader)();
  }

  loadData<T>(key : string, loader : DataLoader<T>) : Promise<T> {
    return loader()
      .then(value => this.data[key] = value)
    ;
  }

  getCrumbs(page : Page) : Page[][] {
    if (page.url == '/') {
      return  [ [ page ] ];
    }
    if (page.categories.length == 0) {
      return [ [ this.getPageOfUrl('/'), page ] ];
    }

    return page.categories
      .map((categoryTitle : string) => {
        return this.getCrumbs(this.getCategoryOfTitle(categoryTitle))
          .map(crumb => crumb.concat([ page ]))
        ;
      })
      .reduce(
        (a : Page[][], b : Page[][]) => a.concat(b),
        [],
      );
  }

  private getPageOfUrl(url : string) : Page {
    const page = this.categories[url];
    if (!page) {
      throw new Error(`couldn't find page of url ${url}`);
    }
    return page;
  }

  private getCategoryOfTitle(title : string) : Category {
    const category = this.categories[title];
    if (!category) {
      throw new Error(`couldn't find category of title ${title}`);
    }
    return category;
  }
}

export default Paramorph;

export interface HashMap<T> {
  [key : string] : T | undefined;
}

