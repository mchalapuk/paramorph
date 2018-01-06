import * as React from 'react';

import DeferredScripts from './DeferredScripts';
import DeferredStyles from './DeferredStyles';

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
      </head>
      <body>
        <div id='root'>
          %%%BODY%%%
        </div>
        <DeferredScripts srcs={ externalBundles.js.concat(localBundles.js) } />
        <DeferredStyles hrefs={ externalBundles.css } />
      </body>
    </html>
  );
}

export default Root;

