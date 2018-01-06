import * as React from 'react';

export interface Props {
  href : string;
  rel : string;
}

const LOAD_LINK_SOURCE = loadLink.toString().replace(/\s/g, '');

export function DeferredLink({ href, rel } : Props) {
  return (
    <script type='text/javascript' dangerouslySetInnerHTML={
      { __html: `(function(){\n${LOAD_LINK_SOURCE}loadLink('${href}','${rel}');})();` }
    } />
  );
}

export default DeferredLink;

function loadLink(href : string, rel : string) {
  const head = document.getElementsByTagName('head')[0];

  const link = document.createElement('link');
  link.setAttribute('href', href);
  link.setAttribute('type', rel);

  head.appendChild(link);
}

