import pages from './pages';

import { Page, Tag } from 'paramorph/models';

const tags = pages.map((page: Page) => page.tags)
  .reduce((a : string[], b : string[]) => a.concat(b))
  .filter((tag : string, index : number, tags : string[]) => tags.indexOf(tag) == index)
  .map((title : string) => new Tag(title))
;

export default tags;

