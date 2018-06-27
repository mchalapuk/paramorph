"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var offensive_1 = require("offensive");
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
    var namePrefix = "pages['" + fileName + "']";
    offensive_1.default(matter, namePrefix + ".matter").is.anObject();
    var date = offensive_1.default(matter.date, namePrefix + ".date").is.aDate();
    var role = offensive_1.default(matter.role, namePrefix + ".role")
        .is.either.containedIn(VALID_ROLES, '\'page\' or \'category\'')
        .or.Undefined();
    var title = offensive_1.default(matter.title, namePrefix + ".title")
        .is.either.aString
        .or.Undefined();
    var description = offensive_1.default(matter.description, namePrefix + ".description")
        .is.either.aString
        .or.Undefined();
    var permalink = offensive_1.default(matter.permalink, namePrefix + ".permalink")
        .is.either.aString
        .or.Undefined();
    var layout = offensive_1.default(matter.layout, namePrefix + ".layout")
        .is.either.aString
        .or.Undefined();
    var image = offensive_1.default(matter.image, namePrefix + ".image")
        .is.either.aString
        .or.Undefined();
    var output = offensive_1.default(matter.output, namePrefix + ".output")
        .is.either.aBoolean
        .or.Undefined();
    var categories = offensive_1.default(matter.categories, namePrefix + ".categories")
        .either.contains.onlyStrings
        .or.is.Undefined();
    var category = offensive_1.default(matter.category, namePrefix + ".category")
        .is.either.aString
        .or.Undefined();
    var tags = offensive_1.default(matter.tags, namePrefix + ".tags")
        .either.contains.onlyStrings
        .or.is.Undefined();
    var feed = offensive_1.default(matter.feed, namePrefix + ".feed")
        .is.either.aBoolean
        .or.Undefined();
    return {
        date: date,
        role: role,
        title: title,
        description: description,
        permalink: permalink,
        layout: layout,
        image: image,
        output: output,
        categories: categories,
        category: category,
        tags: tags,
        feed: feed,
    };
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