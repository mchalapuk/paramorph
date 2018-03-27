"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Paramorph = /** @class */ (function () {
    //  readonly categories : HashMap<Category> = {};
    function Paramorph(config) {
        this.config = config;
        this.layouts = {};
        this.includes = {};
        this.pages = {};
    }
    Paramorph.prototype.addLayout = function (layout) {
        this.layouts[layout.name] = layout;
    };
    Paramorph.prototype.addInclude = function (include) {
        this.includes[include.name] = include;
    };
    Paramorph.prototype.addPage = function (page) {
        this.pages[page.url] = page;
    };
    return Paramorph;
}());
exports.Paramorph = Paramorph;
exports.default = Paramorph;
