import * as React from 'react';

interface Props {
  title : string;
  path : string;
  tags : string[];
  description : string;
  css : string[];
  scripts : string[];
  stylesheets : string[];
}

export default ({ title, path, tags, description, css, scripts, stylesheets } : Props) => (
  <html>
    <head>
      <title>{ title }</title>
      <meta name='path' content={ path }/>
      <meta name='keywords' content={ tags.join(', ') } />
      <meta name='description' content={ description } />
      <meta name='viewport' content='width=device-width; initial-scale=1.0'/>
      <style type='text/css'>{ css.join('') }</style>
    </head>
    <body>
      <div id='root'>
        %%%BODY%%%
      </div>
      { scripts.map(src => (
        <script type='text/javascript' src={ src } key={ src }></script>
      )) }
      { stylesheets.map(src => (
        <link type='text/css' rel='stylesheet' href={ src } key={ src } />
      )) }
    </body>
  </html>
);

