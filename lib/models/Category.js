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
var Page_1 = require("./Page");
var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    function Category(title, description, url, layout, body, image, output, date, categories, tags) {
        var _this = _super.call(this, title, description, url, layout, body, image, output, date, categories, tags, false) || this;
        _this.pages = [];
        return _this;
    }
    return Category;
}(Page_1.Page));
exports.default = Category;
//# sourceMappingURL=Category.js.map