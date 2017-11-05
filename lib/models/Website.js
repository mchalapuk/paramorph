"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Category_1 = require("./Category");
var Tag_1 = require("./Tag");
var Website = /** @class */ (function () {
    function Website() {
        this.layouts = {};
        this.includes = {};
        this.collections = {};
        this.categories = {};
        this.tags = {};
        this.pages = {};
        this.entities = {};
    }
    Website.prototype.addLayout = function (layout) {
        if (this.layouts[layout.name] != undefined) {
            throw new Error("layout of name " + layout.name + " is already added to the config");
        }
        this.layouts[layout.name] = layout;
    };
    Website.prototype.getLayoutOfName = function (name, requiredBy) {
        var layout = this.layouts[name];
        if (layout == undefined) {
            throw new Error("couldn't find layout of name " + name + " required by " + requiredBy);
        }
        return layout;
    };
    Website.prototype.addInclude = function (include) {
        if (this.includes[include.name] != undefined) {
            throw new Error("include of name " + include.name + " is already added to the config");
        }
        this.includes[include.name] = include;
    };
    Website.prototype.getIncludeOfName = function (name, requiredBy) {
        var include = this.includes[name];
        if (include == undefined) {
            throw new Error("couldn't find include of name " + name + (requiredBy ? ' required by ' + requiredBy : ''));
        }
        return include;
    };
    Website.prototype.addCollection = function (collection) {
        if (this.collections[collection.title] != undefined) {
            throw new Error("collection of title " + collection.title + " is already added to the config");
        }
        this.collections[collection.title] = collection;
    };
    Website.prototype.getCollectionOfTitle = function (title, requiredBy) {
        var collection = this.collections[title];
        if (collection == undefined) {
            throw new Error("couldn't find collection of title '" + title + "'" + (requiredBy ? ' required by ' + requiredBy : ''));
        }
        return collection;
    };
    Website.prototype.addPage = function (page) {
        if (page instanceof Category_1.default) {
            throw new Error("page '" + page.title + "' is a category");
        }
        if (page instanceof Tag_1.default) {
            throw new Error("page '" + page.title + "' is a tag");
        }
        this.addEntity(page);
        this.pages[page.url] = page;
    };
    Website.prototype.getPageOfUrl = function (url, requiredBy) {
        var page = this.pages[url];
        if (page == undefined) {
            throw new Error("couldn't find page of url '" + url + "'" + (requiredBy ? ' required by ' + requiredBy : ''));
        }
        return page;
    };
    Website.prototype.addCategory = function (category) {
        this.addEntity(category);
        var title = category.title;
        var previous = this.categories[title];
        if (previous != undefined) {
            throw new Error("detected two categories of the same title ('" + title + "'): " + previous + " and " + category);
        }
        this.categories[title] = category;
    };
    Website.prototype.getCategoryOfTitle = function (title, requiredBy) {
        var category = this.categories[title];
        if (category == undefined) {
            throw new Error("couldn't find category of title '" + title + "'" + (requiredBy ? ' required by ' + requiredBy : ''));
        }
        return category;
    };
    Website.prototype.addTag = function (tag) {
        this.addEntity(tag);
        var title = tag.originalTitle;
        var previous = this.tags[title];
        if (previous != undefined) {
            throw new Error("detected two tags of the same title ('" + title + "'): " + previous + " and " + tag);
        }
        this.tags[title] = tag;
    };
    Website.prototype.getTagOfTitle = function (title, requiredBy) {
        var tag = this.tags[title];
        if (tag == undefined) {
            throw new Error("couldn't find tag of title '" + title + "'" + (requiredBy ? ' required by ' + requiredBy : ''));
        }
        return tag;
    };
    Website.prototype.addEntity = function (page) {
        var url = page.url;
        var previous = this.entities[url];
        if (previous != undefined) {
            throw new Error("detected two pages with the same url (" + url + "): '" + previous.title + "' and '" + page.title + "'");
        }
        this.entities[url] = page;
    };
    Website.prototype.getEntityOfUrl = function (url, requiredBy) {
        var entity = this.entities[url];
        if (entity == undefined) {
            throw new Error("couldn't find entity of url '" + url + "'" + (requiredBy ? ' required by ' + requiredBy : ''));
        }
        return entity;
    };
    Website.prototype.menuContains = function (page) {
        return -1 !== this.menu
            .map(function (entry) { return entry.url; })
            .indexOf(page.url);
    };
    Website.prototype.getMenuEntry = function (page, requiredBy) {
        var found = this.menu.filter(function (entry) { return entry.url === page.url; });
        if (found.length === 0) {
            throw new Error("couldn't find menu entry for url '" + page.url + "'" + (requiredBy ? ' required by ' + requiredBy : ''));
        }
        return found[0];
    };
    return Website;
}());
exports.default = Website;
