const fs = require('fs');
const path = require('path');

const specialDirs = fs.readdirSync('.')
  .filter(file => fs.lstatSync(file).isDirectory())
  .filter(file => file.match(/^_[a-z0-9-_]+$/))
  .filter((key) => ['_layouts', '_includes'].indexOf(key) == -1)
;

const TSX_REGEX = '/\\.tsx$/';
const MD_REGEX = '/\\.markdown$/';

const code = 'module.exports = {\n' + specialDirs
  .map((key) => {
    return { name: key.substring(1), path: `../${key}`, regex: MD_REGEX, subdirs: true };
  })
  .concat([ { name: 'ROOT', path: '../', regex: MD_REGEX, subdirs: false } ])
  .concat([ { name: 'LAYOUTS', path: '../_layouts', regex: TSX_REGEX, subdirs: false } ])
  .concat([ { name: 'INCLUDES', path: '../_includes', regex: TSX_REGEX, subdirs: false } ])
  .map((entry) => {
    return `${entry.name.toUpperCase()}: `
      + `require.context('${entry.path}', ${entry.subdirs}, ${entry.regex})`;
  })
  .join(',\n') + '};\n';

module.exports = function() {
  return { code: code };
};

