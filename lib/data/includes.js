"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requireDirectory_1 = require("./requireDirectory");
var models_1 = require("../models");
var Context = require('./requireContext');
var includes = requireDirectory_1.default(Context.INCLUDES)
    .map(function (module) {
    var match = /^\.\/([^/]*)(\/index)?\.(j|t)sx?$/.exec(module.name);
    if (match === null) {
        return null;
    }
    var name = match[1];
    return new models_1.Include(name, module.exports.default);
});
exports.default = includes;
