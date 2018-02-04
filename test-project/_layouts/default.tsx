import * as React from 'react';
import { Link } from 'react-router-dom';

import { Page, Tag, Website } from 'paramorph/models';

export interface Props {
  website : Website;
  page : Page;
}
export interface State {
}

export class DefaultLayout extends React.Component<Props, State> {
  render() {
    const { website, page } = this.props;

    const Body = page.body;

    return (
      <div>
        <div className='header'>
          <nav>
            <ul>
            { website.menu.map(entry => (
              <li key={ entry.url }><Link to={ entry.url }>{ entry.short }</Link></li>
            )) }
            </ul>
          </nav>
        </div>
        <div className='main'>
          <main>
            <div className='title'>
              <h1><Link to={ page.url }>{ page.title }</Link></h1>
              <ul className='tags'>
              { page.tags
                .map((title : string) => website.getTagOfTitle(title))
                .map(({ title, url } : Tag) => (
                  <li key={ url }><Link to={ url }>{ title }</Link></li>
                )) }
              </ul>
            </div>
            <Body website={ website } page={ page } />
          </main>
        </div>
        <div className='footer'>
          <nav>
            <ul>
            { website.menu.map(entry => (
              <li key={ entry.url }><Link to={ entry.url }>{ entry.short }</Link></li>
            )) }
              <li><Link to='/sitemap'>Sitemap</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default DefaultLayout;

