
import { Page, Category, Collection } from '../models';

import collections from './collections';

const pages = collections.reduce((p : Page[], c : Collection) => p.concat(c.pages), [])
  .filter((page: Page) => !(page instanceof Category))
  .sort((a : Page, b : Page) => !a.compareTo(b));

export default pages;

