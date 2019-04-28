import * as React from 'react';

import DeferredScripts from './DeferredScripts';
import DeferredStyles from './DeferredStyles';

import { Paramorph, Post } from '../model';

export interface BundleUrls {
  css : string[];
  js : string[];
}

export interface RootProps {
  paramorph : Paramorph;
  post : Post;
  localBundles : BundleUrls;
  externalBundles : BundleUrls;
  preload : string[];
}

export function Root({ paramorph, post, localBundles, externalBundles, preload } : RootProps) {
  return (
    <html>
      <head>
        <title>{ post.title } | { paramorph.config.title }</title>
        <meta name='path' content={ post.url }/>
        <meta name='keywords' content={ post.tags.join(', ') } />
        <meta name='description' content={ post.description } />
        <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
        { preload.map(url => (
          <meta name='paramorph-preload' content={ url } />
        )) }
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

