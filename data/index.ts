import * as React from 'react';

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

// add pages to categories and tags
pages.forEach((page : Page) => {
  const requiredBy = `pages['${page.url}']`;
  page.categories.forEach((title : string) =>
    website.getCategoryOfTitle(title, requiredBy).pages.push(page));

  if (page.url == '/' || page instanceof Category) {
    return;
  }

  page.tags.forEach((title : string) =>
    website.getTagOfTitle(title, requiredBy).pages.push(page));
});

if (website.pages['/'] == undefined) {
  throw new Error('page of url \'/\' must be defined to create index.html');
}

export default website;

