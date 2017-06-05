import * as React from 'react';

import { Page, Category, Collection, Layout, Include, Website } from '../models';

import layouts from './layouts';
import includes from './includes';
import categories from './categories';
import collections, { pages } from './collections';
import menu from './menu';

const website = new Website();
layouts.forEach((layout : Layout) => website.addLayout(layout));
includes.forEach((include : Include) => website.addInclude(include));
categories.forEach((category : Category) => website.addCategory(category));
collections.forEach((collection : Collection) => website.addCollection(collection));
pages.forEach((page : Page) => website.addPage(page));
website.menu = menu;

if (website.pages['/'] == undefined) {
  throw new Error('page of url \'/\' must be defined to create index.html');
}

export default website;

