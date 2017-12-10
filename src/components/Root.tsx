import * as React from 'react';

import { Website, Page } from '../models';

export interface BundleUrls {
  css : string[];
  js : string[];
}

export interface RootProps {
  website : Website;
  page : Page;
  localBundles : BundleUrls;
  externalBundles : BundleUrls;
}

export function Root({ website, page, localBundles, externalBundles } : RootProps) {
  return (
    <html>
      <head>
        <title>{ page.title } | { website.title }</title>
        <meta name='path' content={ page.url }/>
        <meta name='keywords' content={ page.tags.join(', ') } />
        <meta name='description' content={ page.description } />
        <meta name='viewport' content='width=device-width; initial-scale=1.0'/>
        { localBundles.css.map(url => (
          <link type='text/css' rel='stylesheet' href={ url } key={ url } />
        )) }
        <meta property='og:url' content={ `${website.baseUrl}${page.url}` } />
        <meta property='og:title' content={ page.title } />
        { page.image !== null ? <meta property='og:image' content={ page.image } /> : null }
        <meta property='og:description' content={ page.description } />
        <meta property='og:locale' content={ website.locale } />
        <meta property='og:type' content={ page.url === '/' ? 'website' : 'article' } />
      </head>
      <body>
        <div id='root'>
          %%%BODY%%%
        </div>
        { externalBundles.js.map(url => (
          <script type='text/javascript' src={ url } key={ url }></script>
        )) }
        { localBundles.js.map(url => (
          <script type='text/javascript' src={ url } key={ url }></script>
        )) }
        { externalBundles.css.map(url => (
          <link type='text/css' rel='stylesheet' href={ url } key={ url } />
        )) }
      </body>
    </html>
  );
}

export default Root;

