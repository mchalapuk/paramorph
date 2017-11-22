"use strict";
var fs = require('fs');
var path = require('path');
var specialDirs = fs.readdirSync('.')
    .filter(function (file) { return fs.lstatSync(file).isDirectory(); })
    .filter(function (file) { return file.match(/^_[a-z0-9-_]+$/); })
    .filter(function (file) { return ['_layouts', '_includes'].indexOf(file) == -1; });
var JS_REGEX = '/\\.js$/';
var MD_REGEX = '/\\.markdown$/';
var code = 'module.exports = {\n' + specialDirs
    .map(function (key) {
    return {
        name: key.substring(1),
        path: path.resolve("./" + key + "/"),
        regex: MD_REGEX,
        subdirs: true,
    };
})
    .concat([{
        name: 'ROOT',
        path: path.resolve('./'),
        regex: MD_REGEX,
        subdirs: false,
    }])
    .concat([{
        name: 'LAYOUTS',
        path: path.resolve('./_layouts/'),
        regex: JS_REGEX,
        subdirs: false,
    }])
    .concat([{
        name: 'INCLUDES',
        path: path.resolve('./_includes/'),
        regex: JS_REGEX,
        subdirs: false,
    }])
    .map(function (entry) {
    return entry.name.toUpperCase() + ": "
        + ("require.context('" + entry.path + "', " + entry.subdirs + ", " + entry.regex + ")");
})
    .join(',\n') + '};\n';
module.exports = function () {
    return { code: code };
};
