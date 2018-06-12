"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("../model");
var TagFactory = /** @class */ (function () {
    function TagFactory(tagPage) {
        this.tagPage = tagPage;
    }
    TagFactory.prototype.create = function (title) {
        return new model_1.Tag(title, this.tagPage.description, this.tagPage.image, this.tagPage.layout, this.tagPage.source, true, this.tagPage.timestamp);
    };
    return TagFactory;
}());
exports.TagFactory = TagFactory;
exports.default = TagFactory;
//# sourceMappingURL=TagFactory.js.map