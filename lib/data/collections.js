"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var requireDirectory_1 = require("./requireDirectory");
var layouts_1 = require("./layouts");
var Context = require('./requireContext');
var config = require('./config');
function checkIsObject(value, name) {
    if (typeof value !== 'object') {
        throw new Error(name + " must be an object; got " + typeof value);
    }
    return value;
}
function checkIsArray(value, name) {
    if (!(value instanceof Array)) {
        throw new Error(name + " must be an array; got " + typeof value);
    }
    return value;
}
function checkIsString(value, name) {
    if (typeof value !== 'string') {
        throw new Error(name + " must be a string; got " + typeof value);
    }
    return value;
}
function checkIsOptionalString(value, name) {
    if (typeof value !== 'string' && value !== null) {
        throw new Error(name + " must be a string or null; got " + typeof value);
    }
    return value;
}
function checkIsOptionalBoolean(value, defaultValue, name) {
    if (typeof value === 'undefined') {
        return defaultValue;
    }
    if (typeof value !== 'boolean') {
        throw new Error(name + " must be a boolean; got " + typeof value);
    }
    return value;
}
checkIsObject(config.collections, 'config.collections');
var website = new models_1.Website('', '', '', '');
layouts_1.default.forEach(function (layout) { return website.addLayout(layout); });
var ROOT_COLLECTION_KEY = '$root';
var ROOT_COLLECTION_TITLE = 'Root Pages';
var DEFAULT_LAYOUT_NAME = 'default';
function titleFromUrl(url, requiredBy) {
    var title = "" + url.charAt(0).toUpperCase() + url.substring(1).replace(/-/g, ' ');
    console.warn(requiredBy + ".title is not defined; defaulting to " + title);
    return title;
}
function urlFromTitle(title, requiredBy) {
    return "/" + title.toLowerCase().replace(/ /g, '-');
}
function parseCollection(key, cfg) {
    var requiredBy = "collections['" + key + "']";
    var title = checkIsString(cfg.title || titleFromUrl(key, requiredBy), requiredBy);
    var layout = website.getLayoutOfName(cfg.layout || DEFAULT_LAYOUT_NAME, requiredBy);
    return new models_1.Collection(title, layout, cfg.output != false);
}
function createPage(role, title, description, url, layout, body, image, output, date, categoryTitles, tags, feed, requiredBy) {
    // replace _ with non-breaking spaces
    title = title.replace(/_/g, String.fromCharCode(160));
    switch (role) {
        case 'page':
            return new models_1.Page(title, description, url, layout, body, image, output, date, categoryTitles, tags, feed);
        case 'category':
            return new models_1.Category(title, description, url, layout, body, image, output, date, categoryTitles, tags);
        default:
            throw new Error("unrecognized role: " + role + " in " + requiredBy);
    }
}
var TITLE_LENGTH_WARN = 60;
function parsePage(name, body, frontMatter, defaultLayout) {
    var requiredBy = "pages['" + name + "']";
    var page = createPage(checkIsString(frontMatter.role || 'page', requiredBy + ".role"), checkIsString(frontMatter.title || titleFromUrl(name, requiredBy), requiredBy + ".title"), checkIsString(frontMatter.description || '', requiredBy + ".description"), checkIsString(frontMatter.permalink || urlFromTitle(name, requiredBy), requiredBy + ".url"), website.getLayoutOfName(checkIsString(frontMatter.layout || defaultLayout, requiredBy + ".layout"), requiredBy), body, checkIsOptionalString(frontMatter.image || null, requiredBy + ".image"), frontMatter.output != false, new Date(checkIsString(frontMatter.date, requiredBy + ".date")), checkIsArray(frontMatter.categories || [], requiredBy + ".categories")
        .concat(frontMatter.category !== undefined
        ? [checkIsString(frontMatter.category, requiredBy + ".category")]
        : []), checkIsArray(frontMatter.tags || [], requiredBy + ".tags"), checkIsOptionalBoolean(frontMatter.feed, true, requiredBy + ".feed"), requiredBy);
    if (page.title.length > TITLE_LENGTH_WARN) {
        console.warn(requiredBy + ".url is to long (" + page.title.length + " > " + TITLE_LENGTH_WARN + ")");
    }
    return page;
}
function createCollection(key, cfg, context) {
    var collection = parseCollection(key, cfg);
    collection.pages = requireDirectory_1.default(context)
        .map(function (module) { return parsePage(module.name.replace(/\.markdown$/, '').replace(/^\.\//, ''), module.exports.component, module.exports.frontMatter, collection.layout.name); });
    return collection;
}
var collections = [].concat.apply(createCollection(ROOT_COLLECTION_KEY, { title: ROOT_COLLECTION_TITLE }, Context.ROOT), Object.keys(config.collections)
    .filter(function (key) {
    var context = Context.hasOwnProperty(key.toUpperCase());
    if (!context) {
        console.warn("couldn't find folder _" + key + " required by collection " + key);
    }
    return context;
})
    .map(function (key) {
    return createCollection(key, config.collections[key], Context[key.toUpperCase()]);
}));
exports.default = collections;
