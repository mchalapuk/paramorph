"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Paramorph = /** @class */ (function () {
    //  readonly categories : HashMap<Category> = {};
    function Paramorph(config) {
        this.config = config;
        this.pages = {};
    }
    Paramorph.prototype.addPage = function (url, page) {
        this.pages[url] = page;
    };
    return Paramorph;
}());
exports.Paramorph = Paramorph;
exports.default = Paramorph;
