
import Layout from './Layout';
import Include from './Include';
import Page from './Page';
import Category from './Category';
import Collection from './Collection';
import MenuEntry from './MenuEntry';

export interface HashTable<T> {
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

  addLayout(layout : Layout) {
    if (this.layouts[layout.name] != undefined) {
      throw new Error(`layout of name ${layout.name} is already added to the config`);
    }
    this.layouts[layout.name] = layout;
  }
  getLayoutOfName(name : string, requiredBy : string) {
    const layout = this.layouts[name];
    if (layout == undefined) {
      throw new Error(`couldn't find layout of name ${name} required by ${requiredBy}`);
    }
    return layout;
  }

  addInclude(include : Include) {
    if (this.includes[include.name] != undefined) {
      throw new Error(`include of name ${include.name} is already added to the config`);
    }
    this.includes[include.name] = include;
  }
  getIncludeOfName(name : string, requiredBy ?: string) {
    const include = this.includes[name];
    if (include == undefined) {
      throw new Error(`couldn't find include of name ${name}${
        requiredBy ? ' required by ' + requiredBy : ''
      }`);
    }
    return include;
  }

  addCollection(collection : Collection) {
    if (this.collections[collection.title] != undefined) {
      throw new Error(`collection of title ${collection.title} is already added to the config`);
    }
    this.collections[collection.title] = collection;
  }
  getCollectionOfTitle(title : string, requiredBy : string) {
    const collection = this.collections[title];
    if (collection == undefined) {
      throw new Error(`couldn't find collection of title '${title}'${
        requiredBy ? ' required by ' + requiredBy : ''
      }`);
    }
    return collection;
  }

  addPage(page : Page) {
    const url = page.url;
    const previous = this.pages[url];
    if (previous != undefined) {
      throw new Error(`detected two pages with the same url (${url}): ${previous} and ${page}`);
    }
    this.pages[url] = page;
  }
  getPageOfUrl(url : string) {
    const page = this.pages[url];
    if (page == undefined) {
      throw new Error(`couldn't find page of url '${url}'`);
    }
    return page;
  }

  addCategory(category : Category) {
    const title = category.title;
    const previous = this.categories[title];
    if (previous != undefined) {
      throw new Error(`detected two categories of the same title ('${title}'): ${previous} and ${category}`);
    }
    this.categories[title] = category;
  }
  getCategoryOfTitle(title : string, requiredBy ?: string) {
    const category = this.categories[title];
    if (category == undefined) {
      throw new Error(`couldn't find category of title '${title}'${
        requiredBy ? ' required by ' + requiredBy : ''
      }`);
    }
    return category;
  }
}

