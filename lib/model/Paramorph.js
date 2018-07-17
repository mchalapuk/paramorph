"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var Paramorph = /** @class */ (function () {
    function Paramorph(config) {
        this.config = config;
        this.layouts = {};
        this.includes = {};
        this.pages = {};
        this.categories = {};
        this.tags = {};
        this.layoutLoaders = {};
        this.includeLoaders = {};
        this.pageLoaders = {};
    }
    Paramorph.prototype.addLayout = function (layout) {
        if (this.layouts.hasOwnProperty(layout.name)) {
            throw new Error("layout of name " + layout.name + " is already set");
        }
        this.layouts[layout.name] = layout;
    };
    Paramorph.prototype.addInclude = function (include) {
        if (this.includes.hasOwnProperty(include.name)) {
            throw new Error("include of name " + include.name + " is already set");
        }
        this.includes[include.name] = include;
    };
    Paramorph.prototype.addPage = function (page) {
        if (this.pages.hasOwnProperty(page.url)) {
            throw new Error("page of url " + page.url + " is already set");
        }
        this.pages[page.url] = page;
        if (page instanceof _1.Category) {
            this.categories[page.title] = page;
        }
        else if (page instanceof _1.Tag) {
            this.tags[page.originalTitle] = page;
        }
    };
    Paramorph.prototype.addLayoutLoader = function (name, loader) {
        if (this.layoutLoaders.hasOwnProperty(name)) {
            throw new Error("layout loader for name " + name + " is already set");
        }
        this.layoutLoaders[name] = loader;
    };
    Paramorph.prototype.loadLayout = function (name) {
        if (!this.layoutLoaders.hasOwnProperty(name)) {
            throw new Error("couldn't find layout loader for path: " + name + "; available loaders: " + JSON.stringify(Object.keys(this.layoutLoaders)));
        }
        return this.layoutLoaders[name];
    };
    Paramorph.prototype.addIncludeLoader = function (name, loader) {
        if (this.includeLoaders.hasOwnProperty(name)) {
            throw new Error("include loader for name " + name + " is already set");
        }
        this.includeLoaders[name] = loader;
    };
    Paramorph.prototype.loadInclude = function (name) {
        if (!this.includeLoaders.hasOwnProperty(name)) {
            throw new Error("couldn't find include loader for path: " + name + "; available loaders: " + JSON.stringify(Object.keys(this.includeLoaders)));
        }
        return this.includeLoaders[name];
    };
    Paramorph.prototype.addPageLoader = function (url, loader) {
        if (this.pageLoaders.hasOwnProperty(url)) {
            throw new Error("page loader for url " + url + " is already set");
        }
        this.pageLoaders[url] = loader;
    };
    Paramorph.prototype.loadPage = function (url) {
        if (!this.pageLoaders.hasOwnProperty(url)) {
            throw new Error("couldn't find page loader for path: " + url + "; available loaders: " + JSON.stringify(Object.keys(this.pageLoaders)));
        }
        return this.pageLoaders[url];
    };
    return Paramorph;
}());
exports.Paramorph = Paramorph;
exports.default = Paramorph;
//# sourceMappingURL=Paramorph.js.map