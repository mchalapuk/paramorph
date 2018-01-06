import * as React from 'react';

export interface Props {
  srcs : string[];
}

const LOAD_SCRIPTS_SOURCE = loadScripts.toString().replace(/\n/g, '').replace(/  +/g, ' ');

export function DeferredScripts({ srcs } : Props) {
  const code = `${LOAD_SCRIPTS_SOURCE}loadScripts(${JSON.stringify(srcs)});`;

  return (
    <script type='text/javascript' dangerouslySetInnerHTML={ { __html: code } } />
  );
}

export default DeferredScripts;

function loadScripts(srcs : string[]) {
  window.addEventListener('load', () => {
    const head = document.getElementsByTagName('head')[0];

    function load(src : string, onLoad : () => void) {
      const script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', src);
      script.onload = onLoad;

      head.appendChild(script);
    }

    function loadNext() {
      const src = srcs.shift() as string;
      const onLoad = srcs.length === 0 ? () => {} : loadNext;
      load(src, onLoad);
    }

    loadNext();
  });
}

