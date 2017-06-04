import * as React from 'react';

import { Website, Layout, Category } from '../models';

import layouts from './layouts';

const config = require('../../_config.yml');

function checkIsObject(value : any, name : string) {
  if (typeof value != 'object') {
    throw new Error(`${name} must be an object; got ${typeof value}`);
  }
  return value;
}
function checkIsString(value : any, name : string) {
  if (typeof value != 'string') {
    throw new Error(`${name} must be a string; got ${typeof value}`);
  }
  return value;
}

checkIsObject(config.categories, 'config.categories');

const website = new Website();
layouts.forEach((layout : Layout) => website.addLayout(layout));

const DEFAULT_LAYOUT_NAME = 'default';

function createCategory(key : string, cfg : any) {
  const title = (cfg.title && checkIsString(cfg.title, `categories[${key}].title`)) || key;
  const url = (cfg.url && checkIsString(cfg.url, `categories[${key}].url`)) || `/${title.replace(/ /g, '-')}`;
  const layoutName = (cfg.layout && checkIsString(cfg.layout, `categories[${key}].layout`)) || DEFAULT_LAYOUT_NAME;
  const layout = website.getLayoutOfName(layoutName, `category ${title}`);
  const category = new Category(title, url, layout, () => React.createElement('div'));
  return category;
}

const categories = Object.keys(config.categories)
  .map((key : string) => createCategory(key, config.categories[key]))
;

export default categories;

