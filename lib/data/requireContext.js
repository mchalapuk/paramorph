"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var specialDirs = fs_1.readdirSync('.')
    .filter(function (file) { return fs_1.lstatSync(file).isDirectory(); })
    .filter(function (file) { return file.match(/^_[a-z0-9-_]+$/); })
    .filter(function (file) { return ['_layouts', '_includes'].indexOf(file) == -1; });
var JS_REGEX = '/\\.(t|j)sx?$/';
var MD_REGEX = '/\\.markdown$/';
var code = 'module.exports = {\n' + specialDirs
    .map(function (key) {
    return {
        name: key.substring(1),
        path: path_1.resolve("./" + key + "/"),
        regex: MD_REGEX,
        subdirs: true,
    };
})
    .concat([{
        name: 'ROOT',
        path: path_1.resolve('./'),
        regex: MD_REGEX,
        subdirs: false,
    }])
    .concat([{
        name: 'LAYOUTS',
        path: path_1.resolve('./_layouts/'),
        regex: JS_REGEX,
        subdirs: false,
    }])
    .concat([{
        name: 'INCLUDES',
        path: path_1.resolve('./_includes/'),
        regex: JS_REGEX,
        subdirs: true,
    }])
    .map(function (entry) {
    return entry.name.toUpperCase() + ": "
        + ("require.context('" + entry.path + "', " + entry.subdirs + ", " + entry.regex + ")");
})
    .join(',\n') + '};\n';
module.exports = function () { return ({ code: code }); };
//# sourceMappingURL=requireContext.js.map