"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requireDirectory_1 = require("./requireDirectory");
var models_1 = require("../models");
var Context = require('./requireContext');
var layouts = requireDirectory_1.default(Context.LAYOUTS)
    .map(function (module) {
    var name = module.name.replace(/^\.\//, '').replace(/\.js$/, '');
    return new models_1.Layout(name, module.exports.default);
});
exports.default = layouts;
