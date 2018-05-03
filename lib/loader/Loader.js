"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("../model");
var Loader = /** @class */ (function () {
    function Loader(structure) {
        this.structure = structure;
    }
    Loader.prototype.load = function (config) {
        return this.structure.scan(config)
            .then(function (specialDirs) {
            var paramorph = new model_1.Paramorph(config);
            specialDirs.layouts.forEach(function (file) { return paramorph.addLayout(new model_1.Layout(file.name, file.path)); });
            specialDirs.includes.forEach(function (file) { return paramorph.addLayout(new model_1.Include(file.name, file.path)); });
            return paramorph;
        });
    };
    return Loader;
}());
exports.Loader = Loader;
exports.default = Loader;
