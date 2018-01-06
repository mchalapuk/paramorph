import * as React from 'react';

import DeferredScript from './DeferredScript';
import DeferredLink from './DeferredLink';

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
        { externalBundles.js.map(url => (
          <DeferredScript src={ url } key={ url } />
        )) }
        { localBundles.js.map(url => (
          <DeferredScript src={ url } key={ url } />
        )) }
        { externalBundles.css.map(url => (
          <DeferredLink href={ url } rel='stylesheet' key={ url } />
        )) }
      </body>
    </html>
  );
}

export default Root;

