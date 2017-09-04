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

const website = new Website();
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
pages.forEach((page : Page) => {
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
  if (page.description) {
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

function descriptionFromContent(page : Page) {
  const element = createElement(page.body, { website, page, respectLimit: true })
  const router = createElement(StaticRouter, { location: page.url, context: {}}, element);
  return stripTags(renderToStaticMarkup(router))
}
function descriptionFromPages(page : Tag | Category) {
  return `${index.title} ${page.title}: ${page.pages.map(p => p.title).join(', ')}`;
}

export default website;

