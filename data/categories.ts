import * as React from 'react';

import { Website, Collection, Page, Category } from '../models';

import collections from './collections';

const categories = collections.reduce((p : Page[], c : Collection) => p.concat(c.pages), [])
  .filter((page: Page) => page instanceof Category);

export default categories as Category[];

