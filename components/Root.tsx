import * as React from 'react';

interface Props {
  title : string;
  path : string;
}

export default ({ title, path } : Props) => (
  <html>
    <head>
      <title>{ title }</title>
      <meta name="path" content={ path }/>
    </head>
    <body>
      <div id="root">
        %%%BODY%%%
      </div>
      <script type="text/javascript" src="/bundle.js"></script>
    </body>
  </html>
);

