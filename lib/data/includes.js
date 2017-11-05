"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requireDirectory_1 = require("./requireDirectory");
var models_1 = require("../models");
var Context = require('./requireContext');
var includes = requireDirectory_1.default(Context.INCLUDES)
    .map(function (module) {
    var name = module.name.replace(/^\.\//, '').replace(/\.tsx$/, '');
    return new models_1.Include(name, module.exports.default);
});
exports.default = includes;
