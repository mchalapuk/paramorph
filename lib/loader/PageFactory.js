"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var offensive_1 = require("offensive");
var PageFactory = /** @class */ (function () {
    function PageFactory() {
    }
    PageFactory.prototype.create = function (file, collection, maybeMatter) {
        var frontMatter = validateFrontMatter(file.name, maybeMatter);
        return null;
    };
    return PageFactory;
}());
exports.PageFactory = PageFactory;
exports.default = PageFactory;
function validateFrontMatter(fileName, matter) {
    var namePrefix = "pages['" + fileName + "']";
    offensive_1.default(matter, namePrefix + ".matter").is.anObject();
    var date = safeParseDate(offensive_1.default(matter.date, namePrefix + ".date").is.aString(), namePrefix + ".date");
    var role = offensive_1.default(matter.role, namePrefix + ".role")
        .is.either.aString
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
function safeParseDate(dateString, variableName) {
    var date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
        throw new Error(variableName + " must be a valid date; got '" + dateString + "'");
    }
    return date;
}
//# sourceMappingURL=PageFactory.js.map