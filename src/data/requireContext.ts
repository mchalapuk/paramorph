import { readdirSync, lstatSync } from 'fs';
import { resolve } from 'path';

const specialDirs = readdirSync('.')
  .filter((file : string) => lstatSync(file).isDirectory())
  .filter((file : string) => file.match(/^_[a-z0-9-_]+$/))
  .filter((file : string) => ['_layouts', '_includes'].indexOf(file) == -1)
;

const JS_REGEX = '/\\.(t|j)sx?$/';
const MD_REGEX = '/\\.markdown$/';

const code = 'module.exports = {\n' + specialDirs
  .map((key : string) => {
    return {
      name: key.substring(1),
      path: resolve(`./${key}/`),
      regex: MD_REGEX,
      subdirs: true,
    };
  })
  .concat([ {
    name: 'ROOT',
    path: resolve('./'),
    regex: MD_REGEX,
    subdirs: false,
  } ])
  .concat([ {
    name: 'LAYOUTS',
    path: resolve('./_layouts/'),
    regex: JS_REGEX,
    subdirs: false,
  } ])
  .concat([ {
    name: 'INCLUDES',
    path: resolve('./_includes/'),
    regex: JS_REGEX,
    subdirs: true,
  } ])
  .map((entry : Entry) => {
    return `${entry.name.toUpperCase()}: `
      + `require.context('${entry.path}', ${entry.subdirs}, ${entry.regex})`;
  })
  .join(',\n') + '};\n';

module.exports = () => ({ code });

interface Entry {
  name : string;
  path : string;
  regex : string;
  subdirs : boolean;
}

