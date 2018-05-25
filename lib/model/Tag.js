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
var Tag = /** @class */ (function (_super) {
    __extends(Tag, _super);
    function Tag(title, description, image, layout, source, output, timestamp) {
        var _this = _super.call(this, "/tags/" + title, "#" + title, description, image, layout, source, output, false, [], [], timestamp) || this;
        _this.pages = [];
        _this.originalTitle = title;
        return _this;
    }
    return Tag;
}(_1.Page));
exports.Tag = Tag;
exports.default = Tag;
//# sourceMappingURL=Tag.js.map