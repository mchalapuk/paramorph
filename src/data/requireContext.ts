const fs = require('fs');
const path = require('path');

const specialDirs = fs.readdirSync('.')
  .filter((file : string) => fs.lstatSync(file).isDirectory())
  .filter((file : string) => file.match(/^_[a-z0-9-_]+$/))
  .filter((file : string) => ['_layouts', '_includes'].indexOf(file) == -1)
;

const JS_REGEX = '/\\.js$/';
const MD_REGEX = '/\\.markdown$/';

const code = 'module.exports = {\n' + specialDirs
  .map((key : string) => {
    return {
      name: key.substring(1),
      path: path.resolve(`./${key}/`),
      regex: MD_REGEX,
      subdirs: true,
    };
  })
  .concat([ {
    name: 'ROOT',
    path: path.resolve('./'),
    regex: MD_REGEX,
    subdirs: false,
  } ])
  .concat([ {
    name: 'LAYOUTS',
    path: path.resolve('./_layouts/'),
    regex: JS_REGEX,
    subdirs: false,
  } ])
  .concat([ {
    name: 'INCLUDES',
    path: path.resolve('./_includes/'),
    regex: JS_REGEX,
    subdirs: false,
  } ])
  .map((entry : Entry) => {
    return `${entry.name.toUpperCase()}: `
      + `require.context('${entry.path}', ${entry.subdirs}, ${entry.regex})`;
  })
  .join(',\n') + '};\n';

module.exports = function() {
  return { code: code };
};

interface Entry {
  name : string;
  path : string;
  regex : RegExp;
  subdirs : boolean;
}

