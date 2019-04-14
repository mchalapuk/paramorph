import * as React from 'react';

export interface Props {
  hrefs : string[];
}

const LOAD_STYLES_SOURCE = loadStyles.toString().replace(/\n/g, '').replace(/  +/g, ' ');

export function DeferredStyles({ hrefs } : Props) {
  const code = `${LOAD_STYLES_SOURCE}loadStyles(${JSON.stringify(hrefs)});`;

  return (
    <script type='text/javascript' dangerouslySetInnerHTML={ { __html: code } } />
  );
}

export default DeferredStyles;

function loadStyles(hrefs : string[]) {
  window.addEventListener('load', () => {
    const head = document.getElementsByTagName('head')[0];

    setTimeout(
      () => {
        hrefs.forEach(href => {
          const link = document.createElement('link');
          link.setAttribute('href', href);
          link.setAttribute('type', 'text/css');
          link.setAttribute('rel', 'stylesheet');

          head.appendChild(link);
        });
      },
      1,
    );
  });
}

