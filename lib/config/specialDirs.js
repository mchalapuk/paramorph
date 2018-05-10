"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
exports.specialDirs = fs_1.readdirSync('.')
    .filter(function (file) { return fs_1.lstatSync(file).isDirectory(); })
    .filter(function (file) { return file.match(/^_[a-z0-9-_]+$/); })
    .filter(function (file) { return ['_layouts', '_includes', '_output'].indexOf(file) == -1; });
exports.default = exports.specialDirs;
//# sourceMappingURL=specialDirs.js.map