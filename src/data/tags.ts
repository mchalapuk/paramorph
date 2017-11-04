import { Page, Tag, Website } from 'paramorph/models';

import pages from './pages';
import categories from './categories';

const website = new Website();
pages.forEach((page : Page) => website.addPage(page));

const tagPage = website.getPageOfUrl('/tag', 'all tags');

function urlFromTitle(title : string) {
  return `/tags/${title.toLowerCase().replace(/ /g, '-')}`;
}

const tags = pages.concat(categories)
  .map((page: Page) => page.tags)
  .reduce((a : string[], b : string[]) => a.concat(b))
  .filter((tag : string, index : number, tags : string[]) => tags.indexOf(tag) == index)
  .map((title : string) => new Tag(title, urlFromTitle(title), tagPage.layout, tagPage.body))
;

export default tags;

