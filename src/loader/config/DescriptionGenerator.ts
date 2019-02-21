
import * as stripTags from 'striptags';

import { Page, Tag, Category } from '../../model';

export class DescriptionGenerator {
  generate(html : string, page : Page) : string {
    return removeEntities(this.fromContent(html, page) || this.fromPages(page));
  }

  private fromContent(html : string, page: Page) {
    const spaced = html.replace(/\n/g, '')
      .replace(/(>)(<)/g, '$1 $2')
    ;
    return stripTags(spaced)
      .replace(/ +/g, ' ')
      .replace(/(^ +| +$)/g, '')
    ;
  }
  private fromPages(page : Page) {
    if (!(page instanceof Tag || page instanceof Category)) {
      return '';
    }
    const { title, pages } = page as Tag | Category;

    const pagesList = pages
      .map(page => page.title)
      .join(', ')
    ;
    return `${title}: ${pagesList}`;
  }
}

export default DescriptionGenerator;

function removeEntities(str : string) {
  return str
    .replace(/&#x22;/g, '\"')
    .replace(/&#x27;/g, '\'')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[^\s;]+;/g, '')
    .replace(/ +/g, ' ')
  ;
}

