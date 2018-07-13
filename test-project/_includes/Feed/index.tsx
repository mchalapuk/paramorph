import * as React from 'react';

import { Page, Paramorph, Context, ContextTypes } from 'paramorph';

import Tile from '../Tile';
import { Branch as TocBranch } from '../TableOfContents';

export interface Props {
  website : Website;
  page : Page;
  feed : Page[];
  respectLimit ?: boolean;
};

export class Feed extends React.ReactComponent<Props, {}> {
  static readonly contextTypes = ContextTypes;
  context : Context;

  render() {
    const { paramorph, page } = this.context;
    const { feed, respectLimit = false, ...props } = this.props;

    const pages = feed
      .filter(page => page.feed)
      .sort((a, b) => b.compareTo(a));

    if (respectLimit) {
      return <TocBranch pages={ pages } shallow { ...props } />;
    }

    return (
      <div>
        { pages.map(page => (<Tile key={ page.url } page={ page } />)) }
      </div>
    );
  }
}

export default Feed;

