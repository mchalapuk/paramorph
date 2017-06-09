import * as React from 'react';

import { Page, Category, Collection, Layout, Include, Website, HashTable } from '../models';

import layouts from './layouts';
import includes from './includes';
import collections from './collections';
import pages from './pages';
import categories from './categories';
import menu from './menu';

const website = new Website();
layouts.forEach((layout : Layout) => website.addLayout(layout));
includes.forEach((include : Include) => website.addInclude(include));
collections.forEach((collection : Collection) => website.addCollection(collection));
pages.forEach((page : Page) => website.addPage(page));
categories.forEach((category : Category) => website.addCategory(category));
website.menu = menu;

// add pages to categories
pages.forEach((page : Page) => page.categories.forEach((title : string) =>
  website.getCategoryOfTitle(title, `pages['${page.url}']`).pages.push(page)));

if (website.pages['/'] == undefined) {
  throw new Error('page of url \'/\' must be defined to create index.html');
}

export default website;

