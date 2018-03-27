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
    }
    Paramorph.prototype.addLayout = function (layout) {
        this.layouts[layout.name] = layout;
    };
    Paramorph.prototype.addInclude = function (include) {
        this.includes[include.name] = include;
    };
    Paramorph.prototype.addPage = function (page) {
        this.pages[page.url] = page;
        if (page instanceof _1.Category) {
            this.categories[page.title] = page;
        }
        else if (page instanceof _1.Tag) {
            this.tags[page.originalTitle] = page;
        }
    };
    return Paramorph;
}());
exports.Paramorph = Paramorph;
exports.default = Paramorph;
