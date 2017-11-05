"use strict";
var fs = require('fs');
var path = require('path');
var specialDirs = fs.readdirSync('.')
    .filter(function (file) { return fs.lstatSync(file).isDirectory(); })
    .filter(function (file) { return file.match(/^_[a-z0-9-_]+$/); })
    .filter(function (file) { return ['_layouts', '_includes'].indexOf(file) == -1; });
var TSX_REGEX = '/\\.tsx$/';
var MD_REGEX = '/\\.markdown$/';
var code = 'module.exports = {\n' + specialDirs
    .map(function (key) {
    return { name: key.substring(1), path: "../../" + key, regex: MD_REGEX, subdirs: true };
})
    .concat([{ name: 'ROOT', path: '../../', regex: MD_REGEX, subdirs: false }])
    .concat([{ name: 'LAYOUTS', path: '../../_layouts', regex: TSX_REGEX, subdirs: false }])
    .concat([{ name: 'INCLUDES', path: '../../_includes', regex: TSX_REGEX, subdirs: false }])
    .map(function (entry) {
    return entry.name.toUpperCase() + ": "
        + ("require.context('" + entry.path + "', " + entry.subdirs + ", " + entry.regex + ")");
})
    .join(',\n') + '};\n';
module.exports = function () {
    return { code: code };
};
