import * as React from 'react';

import { Page } from '../models';

export interface BundleUrls {
  css : string[];
  js : string[];
}

export interface RootProps {
  siteTitle : string;
  page : Page;
  localBundles : BundleUrls;
  externalBundles : BundleUrls;
}

export function Root({ siteTitle, page, localBundles, externalBundles } : RootProps) {
  return (
    <html>
      <head>
        <title>{ page.title } | { siteTitle }</title>
        <meta name='path' content={ page.url }/>
        <meta name='keywords' content={ page.tags.join(', ') } />
        <meta name='description' content={ page.description } />
        <meta name='viewport' content='width=device-width; initial-scale=1.0'/>
        { localBundles.css.map(url => (
          <link type='text/css' rel='stylesheet' href={ url } key={ url } />
        )) }
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

