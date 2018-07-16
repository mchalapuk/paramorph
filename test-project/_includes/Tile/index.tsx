
import * as React from 'react';

import { Page, PureComponent, Link } from 'paramorph';

export interface Props {
  page : Page;
}

export class Tile extends PureComponent<Props, {}> {
  render() {
    const { page } = this.props;

    return (
      <article>
        <h1><Link to={ page.url }>{ page.title }</Link></h1>

        { maybeRenderImage(page) }
        <p>{ page.description }</p>

        <p>
          <Link to={ page.url }>Read More</Link>
        </p>
      </article>
    );
  }
}

export default Tile;

function maybeRenderImage(page : Page) {
  if (!page.image) {
    return null;
  }
  return (
    <p>
      <Link to={ page.url }>
        <img src={ page.image } alt={ `${page.title}` } />
      </Link>
    </p>
  );
}

