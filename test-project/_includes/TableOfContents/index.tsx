import * as React from 'react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { Page, Category, Tag, Website } from 'paramorph/models';

export interface Props {
  website : Website;
  respectLimit ?: boolean;
};

export function TableOfContents({ website, respectLimit = false } : Props) {
  const topLevel = Object.keys(website.pages)
    .map(key => website.pages[key])
    .concat(Object.keys(website.categories)
      .map(key => website.categories[key]))
    .filter(page => page.categories.length == 0)
    .filter(page => page.url != '/')
  ;
  const tags = Object.keys(website.tags)
    .map(key => website.tags[key]);

  return (
    <ul>
      <li key={ '/' }>
        <Link to='/'>{ website.getPageOfUrl('/').title }</Link>
        <Branch pages={ topLevel } shallow={ respectLimit } ellipsis={ respectLimit } />
      </li>
    {
      !respectLimit
      ? tags.map(({ title, url, pages }: Tag) => (
      <li key={ url }>
        <Link to={ url }>{ title }</Link>
        <Branch pages={ pages } shallow />
      </li>
      ))
      : null
    }
    </ul>
  );
}

export default TableOfContents;

export interface BranchProps {
  pages : Page[];
  shallow ?: boolean;
  ellipsis ?: boolean;
}

export function Branch({
  pages,
  shallow = false,
  ellipsis = false
} : BranchProps) : ReactElement<any> {

  return (
    <ul>
  { pages
    .filter(page => page instanceof Category)
    .filter(page => page.output)
    .map(page => page as Category)
    .map(({ url, title, pages } : Category) => (
      <li key={ url }>
        <Link to={ url }>{ title }</Link>
        { !shallow ? <Branch pages={ pages } /> : null }
      </li>
    ))
  }
  { pages
      .filter(page => !(page instanceof Category))
      .filter(page => page.output)
      .map(({ title, url } : Page) => (
        <li key={ url }>
          <Link to={ url }>{ title }</Link>
        </li>
      )) }
  { ellipsis ? <li key='ellipsis'>…</li> : null }
    </ul>
  );
}

