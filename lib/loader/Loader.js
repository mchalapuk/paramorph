"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("../model");
var Loader = /** @class */ (function () {
    function Loader(structure, frontMatter) {
        this.structure = structure;
        this.frontMatter = frontMatter;
    }
    Loader.prototype.load = function (config) {
        var _this = this;
        return this.structure.scan(config)
            .then(function (specialDirs) {
            var paramorph = new model_1.Paramorph(config);
            specialDirs.layouts.forEach(function (file) { return paramorph.addLayout(new model_1.Layout(file.name, file.path)); });
            specialDirs.includes.forEach(function (file) { return paramorph.addLayout(new model_1.Include(file.name, file.path)); });
            Object.keys(specialDirs.collections).map(function (name) {
                _this.addCollection(paramorph, name, specialDirs.collections[name]);
            });
            return paramorph;
        });
    };
    Loader.prototype.addCollection = function (paramorph, name, collection) {
        var _this = this;
        collection.forEach(function (file) { return paramorph.addPage(_this.createPage(file, _this.frontMatter.read(file))); });
    };
    Loader.prototype.createPage = function (file, metaData) {
        return null;
    };
    return Loader;
}());
exports.Loader = Loader;
exports.default = Loader;
