"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var pages_1 = require("./pages");
var categories_1 = require("./categories");
var website = new models_1.Website('', '', '', '');
pages_1.default.forEach(function (page) { return website.addPage(page); });
var tagPage = website.getPageOfUrl('/tag', 'all tags');
function urlFromTitle(title) {
    return "/tags/" + title.toLowerCase().replace(/ /g, '-');
}
var tags = pages_1.default.concat(categories_1.default)
    .map(function (page) { return page.tags; })
    .reduce(function (a, b) { return a.concat(b); })
    .filter(function (tag, index, tags) { return tags.indexOf(tag) == index; })
    .map(function (title) { return new models_1.Tag(title, urlFromTitle(title), tagPage.layout, tagPage.body); });
exports.default = tags;
