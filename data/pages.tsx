
import { Page, Collection } from '../models';

import collections from './collections';

const pages = collections.reduce((p : Page[], c : Collection) => p.concat(c.pages), []);

export default pages;
