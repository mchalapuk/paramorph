"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requireDirectory_1 = require("./requireDirectory");
var models_1 = require("../models");
var Context = require('./requireContext');
var layouts = requireDirectory_1.default(Context.LAYOUTS)
    .map(function (module) {
    var name = module.name.replace(/^\.\//, '').replace(/\.js$/, '');
    var component = module.exports.default;
    if (typeof component !== 'object') {
        throw new Error("default export of layout " + name + " is of wrong type; expected 'object'; got '" + typeof component + "'");
    }
    return new models_1.Layout(name, component);
});
exports.default = layouts;
