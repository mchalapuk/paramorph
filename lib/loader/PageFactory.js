"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var offensive_1 = require("offensive");
require("offensive/assertions/anObject/register");
require("offensive/assertions/aString/register");
require("offensive/assertions/aBoolean/register");
require("offensive/assertions/aDate/register");
require("offensive/assertions/oneOf/register");
require("offensive/assertions/Undefined/register");
require("offensive/assertions/fieldThat/register");
require("offensive/assertions/allElementsThat/register");
var model_1 = require("../model");
var DEFAULT_LAYOUT_NAME = "default";
var PageFactory = /** @class */ (function () {
    function PageFactory() {
    }
    PageFactory.prototype.create = function (file, collection, maybeMatter) {
        var frontMatter = validateFrontMatter(file.name, maybeMatter);
        var role = (frontMatter.role || 'page').toLowerCase();
        switch (role) {
            case 'page':
                return this.create0(model_1.Page, file, collection, frontMatter);
            case 'category':
                return this.create0(model_1.Category, file, collection, frontMatter);
            default:
                throw new Error("Unknown role: '" + role + "'");
        }
    };
    PageFactory.prototype.create0 = function (PageType, file, collection, matter) {
        var title = matter.title || defaultTitle(file);
        var categories = matter.categories || [];
        if (matter.category) {
            categories.push(matter.category);
        }
        return new PageType(matter.permalink || defaultUrl(title), title, matter.description || '', matter.image || null, collection, matter.layout || DEFAULT_LAYOUT_NAME, file.path, matter.output !== undefined ? matter.output : true, matter.feed !== undefined ? matter.feed : true, categories, matter.tags || [], new Date(matter.date).getTime());
    };
    return PageFactory;
}());
exports.PageFactory = PageFactory;
exports.default = PageFactory;
var VALID_ROLES = ['', null, 'page', 'Page', 'PAGE', 'category', 'Category', 'CATEGORY'];
function validateFrontMatter(fileName, matter) {
    return offensive_1.default(matter, "pages['" + fileName + "']")
        .has.fieldThat('date', function (date) { return date.is.aDate; })
        .and.fieldThat('role', function (role) { return role
        .is.oneOf(VALID_ROLES, "be 'page' or 'category'")
        .or.Undefined; })
        .and.fieldThat('title', function (title) { return title.is.aString.or.Undefined; })
        .and.fieldThat('description', function (desc) { return desc.is.aString.or.Undefined; })
        .and.fieldThat('permalink', function (permalink) { return permalink.is.aString.or.Undefined; })
        .and.fieldThat('layout', function (layout) { return layout.is.aString.or.Undefined; })
        .and.fieldThat('image', function (image) { return image.is.aString.or.Undefined; })
        .and.fieldThat('output', function (output) { return output.is.aBoolean.or.Undefined; })
        .and.fieldThat('categories', function (categories) { return categories
        .has.allElementsThat(function (elem) { return elem.is.aString; })
        .or.is.Undefined; })
        .and.fieldThat('category', function (category) { return category.is.aString.or.Undefined; })
        .and.fieldThat('tags', function (tags) { return tags.has.allElementsThat(function (elem) { return elem.is.aString; }).or.Undefined; })
        .and.fieldThat('feed', function (feed) { return feed.is.aBoolean.or.Undefined; })();
}
function defaultTitle(file) {
    var title = "" + file.name.charAt(0).toUpperCase() + file.name.substring(1).replace(/-/g, ' ');
    console.warn("title of " + file.path + " is not defined; defaulting to " + title);
    return title;
}
function defaultUrl(title) {
    return "/" + title.toLowerCase().replace(/ /g, '-');
}
//# sourceMappingURL=PageFactory.js.map