
import Layout from './Layout';
import Include from './Include';
import Page from './Page';
import Category from './Category';
import Collection from './Collection';
import MenuEntry from './MenuEntry';

interface HashTable<T> {
  [key: string]: T;
}

export default class Website {
  title : string;
  baseUrl : string;
  timezone : string;
  layouts : HashTable<Layout> = {};
  includes : HashTable<Include> = {};
  collections : HashTable<Collection> = {};
  categories : HashTable<Category> = {};
  pages : HashTable<Page> = {};
  menu : MenuEntry[];

  private urls : HashTable<any> = {};

  addLayout(layout : Layout) {
    if (this.layouts[layout.name] != undefined) {
      throw new Error(`layout of name ${layout.name} is already added to the config`);
    }
    this.layouts[layout.name] = layout;
  }
  getLayoutOfName(layoutName : string, requiredBy : string) {
    const layout = this.layouts[layoutName];
    if (layout == undefined) {
      throw new Error(`couldn't find layout of name ${layoutName} required by ${requiredBy}`);
    }
    return layout;
  }

  addInclude(include : Include) {
    if (this.includes[include.name] != undefined) {
      throw new Error(`include of name ${include.name} is already added to the config`);
    }
    this.includes[include.name] = include;
  }
  getIncludeOfName(includeName : string, requiredBy : string) {
    const include = this.includes[includeName];
    if (include == undefined) {
      throw new Error(`couldn't find include of name ${includeName} required by ${requiredBy}`);
    }
    return include;
  }

  addCategory(category : Category) {
    this.addUrl(category.url, category);
    this.categories[category.url] = category;
  }

  addCollection(collection : Collection) {
    if (this.collections[collection.title] != undefined) {
      throw new Error(`collection of title ${collection.title} is already added to the config`);
    }
    this.collections[collection.title] = collection;
  }
  getCollectionOfTitle(collectionTitle : string, requiredBy : string) {
    const collection = this.collections[collectionTitle];
    if (collection == undefined) {
      throw new Error(`couldn't find collection of title ${collectionTitle} required by ${requiredBy}`);
    }
    return collection;
  }

  addPage(page : Page) {
    this.addUrl(page.url, page);
    this.pages[page.url] = page;
  }
  getPageOfUrl(url : string) {
    const page = this.pages[url];
    if (page == undefined) {
      throw new Error(`couldn't find page of url ${url}`);
    }
    return page;
  }

  private addUrl(url : string, entity : any) {
    const previous = this.urls[url];
    if (previous != undefined) {
      throw new Error(`detected two entities with the same url (${url}): ${previous} and ${entity}`);
    }
    this.urls[url] = entity;
  }
}

