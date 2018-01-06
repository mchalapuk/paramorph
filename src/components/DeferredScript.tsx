import * as React from 'react';

export interface Props {
  src : string;
}

const LOAD_SCRIPT_SOURCE = loadScript.toString().replace(/\s/g, '');

export function DeferredScript({ src } : Props) {
  return (
    <script type='text/javascript' dangerouslySetInnerHTML={
      { __html: `(function(){\n${LOAD_SCRIPT_SOURCE}loadScript('${src}');})();` }
    } />
  );
}

export default DeferredScript;

function loadScript(src : string) {
  const head = document.getElementsByTagName('head')[0];

  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', src);

  head.appendChild(script);
}

