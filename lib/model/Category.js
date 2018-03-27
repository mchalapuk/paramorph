"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    function Category(url, title, description, image, layout, source, output, feed, categories, tags, timestamp) {
        var _this = _super.call(this, url, title, description, image, layout, source, output, feed, categories, tags, timestamp) || this;
        _this.pages = [];
        return _this;
    }
    return Category;
}(_1.Page));
exports.Category = Category;
exports.default = Category;
