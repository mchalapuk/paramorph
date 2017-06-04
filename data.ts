import * as React from 'react';

import { Page, Category, Collection, Layout, Include, MenuEntry, Website } from './models';

const Context = require('./requireContext');
const config = require('../_config.yml');

function checkIsObject(value : any, name : string) {
  if (typeof value != 'object') {
    throw new Error(`${name} must be an object; got ${typeof value}`);
  }
  return value;
}
function checkIsArray(value : any, name : string) {
  if (!(value instanceof Array)) {
    throw new Error(`${name} must be an array; got ${typeof value}`);
  }
  return value;
}
function checkIsString(value : any, name : string) {
  if (typeof value != 'string') {
    throw new Error(`${name} must be a string; got ${typeof value}`);
  }
  return value;
}

checkIsObject(config.collections, 'config.collections');
checkIsObject(config.categories, 'config.categories');
checkIsArray(config.menu, 'config.menu');

interface Module {
  name : string;
  exports : any;
}

interface RequireContext {
  keys(): string[];
  <T>(id: string): T;
  resolve(id: string): string;
}

function requireDirectory(context : RequireContext) : Module[] {
  return context.keys()
    .map((name : string) => ({
      exports: context(name) as any,
      name: name,
    }));
}

const ROOT_COLLECTION_KEY = '$root';
const ROOT_COLLECTION_TITLE = 'Root Pages';
const DEFAULT_LAYOUT_NAME = 'default';

const website = new Website();

requireDirectory(Context.LAYOUTS)
  .forEach((module : Module) => {
    const name = module.name.replace(/^\.\//, '').replace(/\.tsx$/, '');
    website.addLayout(new Layout(name, module.exports.default));
  });

requireDirectory(Context.INCLUDES)
  .forEach((module : Module) => {
    const name = module.name.replace(/^\.\//, '').replace(/\.tsx$/, '');

    website.addInclude(new Include(name, module.exports.default));
  });

function createCategory(key : string, cfg : any) {
  const title = (cfg.title && checkIsString(cfg.title, `categories[${key}].title`)) || key;
  const url = (cfg.url && checkIsString(cfg.url, `categories[${key}].url`)) || `/${title.replace(/ /g, '-')}`;
  const layoutName = (cfg.layout && checkIsString(cfg.layout, `categories[${key}].layout`)) || DEFAULT_LAYOUT_NAME;
  const layout = website.getLayoutOfName(layoutName, `category ${title}`);
  const category = new Category(title, url, layout, () => React.createElement('div'));
  return category;
}

Object.keys(config.categories)
  .map((key : string) => createCategory(key, config.categories[key]))
  .forEach((category : Category) => website.addCategory(category))
;

function titleFromUrl(url : string, requiredBy : string) {
  const title = `${url.charAt(1).toUpperCase()}${url.substring(2).replace(/-/g, ' ')}`;
  console.warn(`title field is not defined in ${requiredBy}; defaulting to ${title}`);
  return title;
}

function getCategories(frontMatter : any) {
  if (frontMatter.categories != undefined) {
    checkIsArray(frontMatter.categories,
      `categories field in front matter data of page ${frontMatter.name}`);
  }

  const categoryNames = frontMatter.categories || [];
  if (frontMatter.category != undefined) {
    checkIsString(frontMatter.category,
      `category field in front matter data of page ${frontMatter.name}`);
    categoryNames.push(frontMatter.category);
  }

  return categoryNames.map((name : string) => {
    const category = website.categories[name];
    if (category == undefined) {
      throw new Error(`couldn't find category of name ${name} required by page ${frontMatter.name}`);
    }
    return category;
  });
}

function createCollection(key : string, cfg : any, context : RequireContext) {
  const title = cfg.title || titleFromUrl(key, `collection ${key}`);
  const layout = website.getLayoutOfName(cfg.layout || DEFAULT_LAYOUT_NAME, `collection ${key}`);
  const collection = new Collection(title, layout, cfg.output != false);

  collection.pages = requireDirectory(context).map((module : Module, key : number) => {
    const frontMatter = module.exports.frontMatter;
    const name = module.name.replace(/\.markdown$/, '').replace(/^\.\//, '');
    const layout = website.getLayoutOfName(frontMatter.layout || collection.layout.name, `page ${name}`);
    const body = module.exports.component;
    const url = frontMatter.permalink || `/${name}`;
    const title = frontMatter.title || titleFromUrl(url, `page ${name}`);
    const date = frontMatter.date;

    const page = new Page(title, url, layout, body, date);

    const categories = getCategories(frontMatter);
    categories.forEach((category : Category) => category.pages.push(page));
    page.categories = categories;

    website.addPage(page);
    return page;
  });

  return collection;
}

website.collections = [].concat.call([
  createCollection(ROOT_COLLECTION_KEY, { title : ROOT_COLLECTION_TITLE }, Context.ROOT),
  Object.keys(config.collections)
    .filter((key : string) => {
      const context = Context.hasOwnProperty(key.toUpperCase());
      if (!context) {
        console.warn(`couldn't find folder _${key} required by collection ${key}`);
      }
      return context;
    })
    .forEach((key : string) =>
      createCollection(key, config.collections[key], Context[key.toUpperCase()])),
]);

const isLocalUrl = (url : string) => url.charAt(0) == '/' && url.charAt(1) != '/';

function warnIfNotAPageOrCategory(url : string, requiredBy : string) {
  if (isLocalUrl(url) && website.pages[url] == undefined && website.categories[url] == undefined) {
    console.warn(`page of url \'${url}\' required by ${requiredBy} is not defined`);
  }
  return url;
}

website.menu = config.menu.map((cfg : any, i : number) => {
  return new MenuEntry(
    checkIsString(cfg.title, `menu[${i}].title`),
    checkIsString(cfg.short, `menu[${i}].short`),
    warnIfNotAPageOrCategory(checkIsString(cfg.url, `menu[${i}].url`), `menu entry '${cfg.title}'`),
    cfg.icon && checkIsString(cfg.icon, `menu[${i}].icon`),
  );
});

if (website.pages['/'] == undefined) {
  throw new Error('page of url \'/\' must be defined to create index.html');
}

export default website;

