import * as React from 'react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Page, Website } from 'paramorph/models';

import { Branch as TocBranch } from '../TableOfContents';

export interface Props {
  website : Website;
  page : Page;
}

export function Tile({ website, page } : Props) {
  const Body = page.body;

  return (
    <article>
      <h1><Link to={ page.url }>{ page.title }</Link></h1>

      { maybeRenderImage(page) }
      <Body website={ website } page={ page } respectLimit={ true } />

      <p>
        <Link to={ page.url }>Read More</Link>
      </p>
    </article>
  );
}

export default Tile;

function maybeRenderImage(page : Page) {
  if (!page.image) {
    return null;
  }
  return (
    <Link to={ page.url }>
      <img src={ page.image } alt={ `${page.title}` } />
    </Link>
  );
}

