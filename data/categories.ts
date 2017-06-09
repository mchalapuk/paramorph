import * as React from 'react';

import { Website, Page, Category } from '../models';

import pages from './pages';

const categories = pages.filter((page : Page) => page instanceof Category);

export default categories;

