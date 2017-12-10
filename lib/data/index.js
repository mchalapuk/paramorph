"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var server_1 = require("react-dom/server");
var react_router_dom_1 = require("react-router-dom");
var utils_1 = require("../utils");
var models_1 = require("../models");
var layouts_1 = require("./layouts");
var includes_1 = require("./includes");
var collections_1 = require("./collections");
var pages_1 = require("./pages");
var categories_1 = require("./categories");
var tags_1 = require("./tags");
var menu_1 = require("./menu");
var config = require('./config');
var website = new models_1.Website(checkIsString(config.title, 'config.title'), checkIsString(config.baseUrl, 'config.baseUrl'), checkIsString(config.timezone, 'config.timezone'), checkIsString(config.locale || 'en_US', 'config.locale'));
exports.default = website;
layouts_1.default.forEach(function (layout) { return website.addLayout(layout); });
includes_1.default.forEach(function (include) { return website.addInclude(include); });
collections_1.default.forEach(function (collection) { return website.addCollection(collection); });
pages_1.default.forEach(function (page) { return website.addPage(page); });
categories_1.default.forEach(function (category) { return website.addCategory(category); });
tags_1.default.forEach(function (tag) { return website.addTag(tag); });
website.menu = menu_1.default;
var index = website.pages['/'];
if (index === undefined) {
    throw new Error('page of url \'/\' must be defined to create index.html');
}
// add pages to categories and tags
pages_1.default
    .filter(function (page) { return page.url !== '/'; })
    .forEach(function (page) {
    var requiredBy = "pages['" + page.url + "']";
    page.categories.forEach(function (title) { return website.getCategoryOfTitle(title, requiredBy).pages.push(page); });
    page.tags.forEach(function (title) { return website.getTagOfTitle(title, requiredBy).pages.push(page); });
});
// add sub-categories to categories
categories_1.default.forEach(function (page) {
    var requiredBy = "pages['" + page.url + "']";
    page.categories.forEach(function (title) { return website.getCategoryOfTitle(title, requiredBy).pages.push(page); });
});
// generate descriptions for pages, categories and tags
pages_1.default.forEach(function (page) {
    if (page.description) {
        return;
    }
    Object.defineProperty(page, 'description', {
        get: function () { return descriptionFromContent(page); },
        set: function () { throw new Error('Page.description is readonly'); }
    });
});
categories_1.default.forEach(function (category) {
    if (category.description) {
        return;
    }
    Object.defineProperty(category, 'description', {
        get: function () { return descriptionFromContent(category) || descriptionFromPages(category); },
        set: function () { throw new Error('Page.description is readonly'); }
    });
});
tags_1.default.forEach(function (tag) {
    tag.description = descriptionFromPages(tag);
});
function descriptionFromContent(page) {
    var element = react_1.createElement(page.body, { website: website, page: page, respectLimit: true });
    var router = react_1.createElement(react_router_dom_1.StaticRouter, { location: page.url, context: {} }, element);
    return utils_1.stripTags(server_1.renderToStaticMarkup(router));
}
function descriptionFromPages(page) {
    return index.title + " " + page.title + ": " + page.pages.map(function (p) { return p.title; }).join(', ');
}
function checkIsString(value, name) {
    if (typeof value !== 'string') {
        throw new Error(name + " must be a string; got " + value + " (" + typeof value + ")");
    }
    return value;
}
