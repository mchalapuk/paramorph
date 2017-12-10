import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { stripTags } from '../utils';

import { Page, Category, Tag, Collection, Layout, Include, Website, HashTable } from '../models';

import layouts from './layouts';
import includes from './includes';
import collections from './collections';
import pages from './pages';
import categories from './categories';
import tags from './tags';
import menu from './menu';

const config = require('./config');

const website = new Website(
  checkIsString(config.title, 'config.title'),
  checkIsString(config.baseUrl, 'config.baseUrl'),
  checkIsString(config.timezone, 'config.timezone'),
  checkIsString(config.locale || 'en_US', 'config.locale'),
);

export default website;

layouts.forEach((layout : Layout) => website.addLayout(layout));
includes.forEach((include : Include) => website.addInclude(include));
collections.forEach((collection : Collection) => website.addCollection(collection));
pages.forEach((page : Page) => website.addPage(page));
categories.forEach((category : Category) => website.addCategory(category));
tags.forEach((tag : Tag) => website.addTag(tag));
website.menu = menu;

const index = website.pages['/'];
if (index === undefined) {
  throw new Error('page of url \'/\' must be defined to create index.html');
}

// add pages to categories and tags
pages
  .filter((page : Page) => page.url !== '/')
  .forEach((page : Page) => {
    const requiredBy = `pages['${page.url}']`;
    page.categories.forEach(title => website.getCategoryOfTitle(title, requiredBy).pages.push(page));
    page.tags.forEach(title => website.getTagOfTitle(title, requiredBy).pages.push(page));
  });

// add sub-categories to categories
categories.forEach((page : Page) => {
  const requiredBy = `pages['${page.url}']`;
  page.categories.forEach(title => website.getCategoryOfTitle(title, requiredBy).pages.push(page));
});

// generate descriptions for pages, categories and tags
pages.forEach((page : Page) => {
  if (page.description || !page.output) {
    return;
  }
  Object.defineProperty(page, 'description', {
    get: () => descriptionFromContent(page),
    set: () => { throw new Error('Page.description is readonly'); }
  });
});
categories.forEach((category : Category) => {
  if (category.description) {
    return;
  }
  Object.defineProperty(category, 'description', {
    get: () => descriptionFromContent(category) || descriptionFromPages(category),
    set: () => { throw new Error('Page.description is readonly'); }
  });
});
tags.forEach((tag: Tag) => {
  tag.description = descriptionFromPages(tag);
});

// check for missing descriptions
const missingDescription = pages
  .concat(categories)
  .concat(tags)
  .filter((p : Page) => p.description === '' && p.output)
  .map((p : Page) => p.title);
if (missingDescription.length !== 0) {
  throw new Error(`Description missing in pages ${JSON.stringify(missingDescription)}. Write some text in the article or add \'description\' field.`);
}

// if absent, set image to first img src found in content
pages.forEach((page : Page) => {
  if (page.image || !page.output) {
    return;
  }
  Object.defineProperty(page, 'image', {
    get: () => imageFromContent(page),
    set: () => { throw new Error('Page.image is readonly'); }
  });
});

function descriptionFromContent(page : Page) {
  const element = createElement(page.body, { website, page, respectLimit: true })
  const router = createElement(StaticRouter, { location: page.url, context: {}}, element);
  return stripTags(renderToStaticMarkup(router))
}
function descriptionFromPages(page : Tag | Category) {
  return `${index.title} ${page.title}: ${page.pages.map(p => p.title).join(', ')}`;
}

function imageFromContent(page : Page) {
  const element = createElement(page.body, { website, page, respectLimit: false })
  const router = createElement(StaticRouter, { location: page.url, context: {}}, element);
  const markup = renderToStaticMarkup(router);
  const found = /<img[^>]* src="([^"]*)"[^>]*>/.exec(markup);
  if (!found) {
    console.warn(`Couldn't find image on page ${page.url}; page.image is null`);
    return null;
  }
  return found[1];
}

function checkIsString(value : any, name : string) {
  if (typeof value !== 'string') {
    throw new Error(`${name} must be a string; got ${value} (${typeof value})`);
  }
  return value as string;
}
