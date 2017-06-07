import * as React from 'react';

interface Props {
  title : string;
  path : string;
  scripts : string[];
}

export default ({ title, path, scripts } : Props) => (
  <html>
    <head>
      <title>{ title }</title>
      <meta name="path" content={ path }/>
    </head>
    <body>
      <div id="root">
        %%%BODY%%%
      </div>
      { scripts.map((src, key) => (
        <script type={ 'text/javascript '} src={ src } key={ key }></script>
      )) }
    </body>
  </html>
);

