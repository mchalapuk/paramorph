
import { Page, Layout, Category, Collection, Website } from '../models';

import requireDirectory, { Module, RequireContext } from './requireDirectory';

import layouts from './layouts';
import categories from './categories';

const Context = require('./requireContext');
const config = require('../../_config.yml');

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

const website = new Website();
layouts.forEach((layout : Layout) => website.addLayout(layout));
categories.forEach((category : Category) => website.addCategory(category));

const ROOT_COLLECTION_KEY = '$root';
const ROOT_COLLECTION_TITLE = 'Root Pages';
const DEFAULT_LAYOUT_NAME = 'default';

function titleFromUrl(url : string, requiredBy : string) {
  const title = `${url.charAt(0).toUpperCase()}${url.substring(1).replace(/-/g, ' ')}`;
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
    return page;
  });

  return collection;
}

const collections = [].concat.apply(
  createCollection(ROOT_COLLECTION_KEY, { title : ROOT_COLLECTION_TITLE }, Context.ROOT),
  Object.keys(config.collections)
    .filter((key : string) => {
      const context = Context.hasOwnProperty(key.toUpperCase());
      if (!context) {
        console.warn(`couldn't find folder _${key} required by collection ${key}`);
      }
      return context;
    })
    .map((key : string) =>
      createCollection(key, config.collections[key], Context[key.toUpperCase()])),
);

export default collections;
export const pages = collections.reduce((p : Page[], c : Collection) => p.concat(c.pages), []);

