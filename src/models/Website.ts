
import Layout from './Layout';
import Include from './Include';
import Page from './Page';
import Category from './Category';
import Tag from './Tag';
import Collection from './Collection';
import MenuEntry from './MenuEntry';

export interface HashTable<T> {
  [key: string]: T;
}

export default class Website {
  title : string;
  baseUrl : string;
  timezone : string;
  locale : string;
  layouts : HashTable<Layout> = {};
  includes : HashTable<Include> = {};
  collections : HashTable<Collection> = {};
  categories : HashTable<Category> = {};
  tags : HashTable<Tag> = {};
  pages : HashTable<Page> = {};
  entities : HashTable<Page> = {};
  menu : MenuEntry[];

  constructor(title : string, baseUrl : string, timezone : string, locale : string) {
    this.title = title;
    this.baseUrl = baseUrl;
    this.timezone = timezone;
    this.locale = locale;
  }

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
    if (page instanceof Category) {
      throw new Error(`page '${page.title}' is a category`);
    }
    if (page instanceof Tag) {
      throw new Error(`page '${page.title}' is a tag`);
    }
    this.addEntity(page);

    this.pages[page.url] = page;
  }
  getPageOfUrl(url : string, requiredBy ?: string) {
    const page = this.pages[url];
    if (page == undefined) {
      throw new Error(`couldn't find page of url '${url}'${
        requiredBy ? ' required by ' + requiredBy : ''
      }`);
    }
    return page;
  }

  addCategory(category : Category) {
    this.addEntity(category);

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

  addTag(tag : Tag) {
    this.addEntity(tag);

    const title = tag.originalTitle;
    const previous = this.tags[title];
    if (previous != undefined) {
      throw new Error(`detected two tags of the same title ('${title}'): ${previous} and ${tag}`);
    }
    this.tags[title] = tag;
  }
  getTagOfTitle(title : string, requiredBy ?: string) {
    const tag = this.tags[title];
    if (tag == undefined) {
      throw new Error(`couldn't find tag of title '${title}'${
        requiredBy ? ' required by ' + requiredBy : ''
      }`);
    }
    return tag;
  }

  private addEntity(page : Page) {
    const url = page.url;
    const previous = this.entities[url];
    if (previous != undefined) {
      throw new Error(`detected two pages with the same url (${
        url}): '${previous.title}' and '${page.title}'`);
    }
    this.entities[url] = page;
  }
  getEntityOfUrl(url : string, requiredBy ?: string) {
    const entity = this.entities[url];
    if (entity == undefined) {
      throw new Error(`couldn't find entity of url '${url}'${
        requiredBy ? ' required by ' + requiredBy : ''
      }`);
    }
    return entity;
  }

  menuContains(page : Page) {
    return -1 !== this.menu
      .map(entry => entry.url)
      .indexOf(page.url);
  }
  getMenuEntry(page : Page, requiredBy ?: string) {
    const found = this.menu.filter(entry => entry.url === page.url);
    if (found.length === 0) {
      throw new Error(`couldn't find menu entry for url '${page.url}'${
        requiredBy ? ' required by ' + requiredBy : ''
      }`);
    }
    return found[0];
  }
}

