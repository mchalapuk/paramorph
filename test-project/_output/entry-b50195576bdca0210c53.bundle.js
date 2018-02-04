(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-router-dom"), require("react-dom/server"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define([, , , ], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("react-router-dom"), require("react-dom/server"), require("react-dom")) : factory(root["React"], root["ReactRouterDOM"], root["ReactDOMServer"], root["ReactDOM"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_21__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Page_1 = __webpack_require__(6);
exports.Page = Page_1.default;
var Collection_1 = __webpack_require__(34);
exports.Collection = Collection_1.default;
var Category_1 = __webpack_require__(12);
exports.Category = Category_1.default;
var Tag_1 = __webpack_require__(13);
exports.Tag = Tag_1.default;
var Layout_1 = __webpack_require__(35);
exports.Layout = Layout_1.default;
var Include_1 = __webpack_require__(36);
exports.Include = Include_1.default;
var MenuEntry_1 = __webpack_require__(37);
exports.MenuEntry = MenuEntry_1.default;
var Website_1 = __webpack_require__(38);
exports.Website = Website_1.default;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var requireDirectory_1 = __webpack_require__(7);
var models_1 = __webpack_require__(1);
var Context = __webpack_require__(8);
var includes = requireDirectory_1.default(Context.INCLUDES)
    .map(function (module) {
    var match = /^\.\/([^/]*)(\/index)?\.(j|t)sx?$/.exec(module.name);
    if (match === null) {
        return null;
    }
    var name = match[1];
    return new models_1.Include(name, module.exports.default);
});
exports.default = includes;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_1 = __webpack_require__(0);
var Content = /** @class */ (function (_super) {
    __extends(Content, _super);
    function Content() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Content.prototype.render = function () {
        this.outstandingLimit = this.props.limit || Number.MAX_SAFE_INTEGER;
        var children = this.props.children;
        return (React.createElement("div", { className: 'content' }, this.renderChildren(children)));
    };
    Content.prototype.renderChildren = function (children) {
        return react_1.Children.map(children, this.renderNode.bind(this));
    };
    Content.prototype.renderNode = function (node, key) {
        if (this.isLimitReached() || isEmpty(node)) {
            return null;
        }
        switch (typeof node) {
            case 'boolean':
            case 'number':
                return node;
            case 'string':
                return this.renderString(node);
            default:
                return this.renderComponent(node, key);
        }
    };
    Content.prototype.renderString = function (child) {
        if (child.indexOf('.') === -1) {
            return child;
        }
        var sentences = sentencize(child);
        var outstandingLimit = this.outstandingLimit;
        this.outstandingLimit -= sentences.length;
        return sentences.slice(0, outstandingLimit);
    };
    Content.prototype.renderComponent = function (elem, key) {
        var _a = this.props, respectLimit = _a.respectLimit, _b = _a.mapper, mapper = _b === void 0 ? function (node) { return node; } : _b, props = __rest(_a, ["respectLimit", "mapper"]);
        if (respectLimit && elem.type === 'img') {
            return null;
        }
        return mapper(react_1.cloneElement(elem, cloneProps(elem, props, key), this.renderChildren(elem.props.children)));
    };
    Content.prototype.isLimitReached = function () {
        var respectLimit = this.props.respectLimit;
        return respectLimit && this.outstandingLimit <= 0;
    };
    return Content;
}(react_1.Component));
exports.Content = Content;
exports.default = Content;
function isEmpty(node) {
    return node === null || node === undefined;
}
function sentencize(child) {
    var sentenceRegexp = /[^.!?…]*[.!?…]/g;
    var matches = [];
    var match;
    while ((match = sentenceRegexp.exec(child)) !== null) {
        matches.push(match[0]);
    }
    return matches;
}
function cloneProps(elem, limiterProps, key) {
    if (typeof elem.type === 'string') {
        return __assign({ key: key }, elem.props);
    }
    return __assign({ key: key }, elem.props, limiterProps);
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Page = /** @class */ (function () {
    function Page(title, description, url, layout, body, image, output, date, categories, tags, feed) {
        this.title = title;
        this.description = description;
        this.url = url;
        this.layout = layout;
        this.body = body;
        this.image = image;
        this.output = output;
        this.date = date;
        this.categories = categories;
        this.tags = tags;
        this.feed = feed;
    }
    Page.prototype.getCrumbs = function (website) {
        var _this = this;
        if (this.url == '/') {
            return [[this]];
        }
        if (this.categories.length == 0) {
            return [[website.getPageOfUrl('/'), this]];
        }
        return this.categories.map(function (categoryTitle) {
            return website.getCategoryOfTitle(categoryTitle)
                .getCrumbs(website)
                .map(function (crumb) { return crumb.concat([_this]); });
        }).reduce(function (a, b) { return a.concat(b); }, []);
    };
    Page.prototype.compareTo = function (another) {
        if (this.date === another.date) {
            if (this.title === another.title) {
                return this.url > another.url ? 1 : -1;
            }
            return this.title > another.title ? 1 : -1;
        }
        return this.date.getTime() > another.date.getTime() ? 1 : -1;
    };
    return Page;
}());
exports.Page = Page;
exports.default = Page;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function requireDirectory(context) {
    return context.keys()
        .map(function (name) { return ({
        exports: context(name),
        name: name,
    }); });
}
exports.default = requireDirectory;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
CATEGORIES: __webpack_require__(39),
PAGES: __webpack_require__(41),
POSTS: __webpack_require__(47),
ROOT: __webpack_require__(49),
LAYOUTS: __webpack_require__(50),
INCLUDES: __webpack_require__(52)};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = __webpack_require__(1);
var requireDirectory_1 = __webpack_require__(7);
var layouts_1 = __webpack_require__(14);
var Context = __webpack_require__(8);
var config = __webpack_require__(10);
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


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {"title":"Paramorph","timezone":"Europe/Warsaw","collections":{"categories":{"title":"Categories","output":true},"pages":{"title":"Pages","output":true},"posts":{"title":"Posts","output":true},"uploads":{"title":"Uploads","output":false}},"baseUrl":"http://paramorph.github.io","image":"http://paramorph.github.io/facebook.png","locale":"pl_PL","menu":[{"title":"Home","short":"Home","url":"/","icon":null},{"title":"Blog","short":"Blog","url":"/blog","icon":null},{"title":"Contact","short":"Contact","url":"/contact","icon":null}]};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

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
var Page_1 = __webpack_require__(6);
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


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

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
var Page_1 = __webpack_require__(6);
var Tag = /** @class */ (function (_super) {
    __extends(Tag, _super);
    function Tag(title, url, layout, body) {
        var _this = _super.call(this, '#' + title, '', url, layout, body, null, true, new Date(Date.UTC(0, 0)), [], [], false) || this;
        _this.pages = [];
        _this.originalTitle = title;
        return _this;
    }
    return Tag;
}(Page_1.default));
exports.default = Tag;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var requireDirectory_1 = __webpack_require__(7);
var models_1 = __webpack_require__(1);
var Context = __webpack_require__(8);
var layouts = requireDirectory_1.default(Context.LAYOUTS)
    .map(function (module) {
    var name = module.name.replace(/^\.\//, '').replace(/\.(t|j)sx?$/, '');
    var component = module.exports.default;
    if (typeof component !== 'function') {
        throw new Error("default export of layout " + name + " is of wrong type; expected 'function'; got '" + typeof component + "'");
    }
    return new models_1.Layout(name, component);
});
exports.default = layouts;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(3);
function Tile(_a) {
    var website = _a.website,
        page = _a.page;
    var Body = page.body;
    return React.createElement("article", null, React.createElement("h1", null, React.createElement(react_router_dom_1.Link, { to: page.url }, page.title)), maybeRenderImage(page), React.createElement(Body, { website: website, page: page, respectLimit: true }), React.createElement("p", null, React.createElement(react_router_dom_1.Link, { to: page.url }, "Read More")));
}
exports.Tile = Tile;
exports.default = Tile;
function maybeRenderImage(page) {
    if (!page.image) {
        return null;
    }
    return React.createElement(react_router_dom_1.Link, { to: page.url }, React.createElement("img", { src: page.image, alt: "" + page.title }));
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(3);
var models_1 = __webpack_require__(1);
;
function TableOfContents(_a) {
    var website = _a.website,
        _b = _a.respectLimit,
        respectLimit = _b === void 0 ? false : _b;
    var topLevel = Object.keys(website.pages).map(function (key) {
        return website.pages[key];
    }).concat(Object.keys(website.categories).map(function (key) {
        return website.categories[key];
    })).filter(function (page) {
        return page.categories.length == 0;
    }).filter(function (page) {
        return page.url != '/';
    });
    var tags = Object.keys(website.tags).map(function (key) {
        return website.tags[key];
    });
    return React.createElement("ul", null, React.createElement("li", { key: '/' }, React.createElement(react_router_dom_1.Link, { to: '/' }, website.getPageOfUrl('/').title), React.createElement(Branch, { pages: topLevel, shallow: respectLimit, ellipsis: respectLimit })), !respectLimit ? tags.map(function (_a) {
        var title = _a.title,
            url = _a.url,
            pages = _a.pages;
        return React.createElement("li", { key: url }, React.createElement(react_router_dom_1.Link, { to: url }, title), React.createElement(Branch, { pages: pages, shallow: true }));
    }) : null);
}
exports.TableOfContents = TableOfContents;
exports.default = TableOfContents;
function Branch(_a) {
    var pages = _a.pages,
        _b = _a.shallow,
        shallow = _b === void 0 ? false : _b,
        _c = _a.ellipsis,
        ellipsis = _c === void 0 ? false : _c;
    return React.createElement("ul", null, pages.filter(function (page) {
        return page instanceof models_1.Category;
    }).filter(function (page) {
        return page.output;
    }).map(function (page) {
        return page;
    }).map(function (_a) {
        var url = _a.url,
            title = _a.title,
            pages = _a.pages;
        return React.createElement("li", { key: url }, React.createElement(react_router_dom_1.Link, { to: url }, title), !shallow ? React.createElement(Branch, { pages: pages }) : null);
    }), pages.filter(function (page) {
        return !(page instanceof models_1.Category);
    }).filter(function (page) {
        return page.output;
    }).map(function (_a) {
        var title = _a.title,
            url = _a.url;
        return React.createElement("li", { key: url }, React.createElement(react_router_dom_1.Link, { to: url }, title));
    }), ellipsis ? React.createElement("li", { key: 'ellipsis' }, "\u2026") : null);
}
exports.Branch = Branch;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = __webpack_require__(1);
var collections_1 = __webpack_require__(9);
var pages = collections_1.default.reduce(function (p, c) { return p.concat(c.pages); }, [])
    .filter(function (page) { return !(page instanceof models_1.Category); });
exports.default = pages;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = __webpack_require__(1);
var collections_1 = __webpack_require__(9);
var categories = collections_1.default.reduce(function (p, c) { return p.concat(c.pages); }, [])
    .filter(function (page) { return page instanceof models_1.Category; });
exports.default = categories;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(0);
var react_dom_1 = __webpack_require__(21);
var react_router_dom_1 = __webpack_require__(3);
var react_hot_loader_1 = __webpack_require__(22);
var server_1 = __webpack_require__(27);
var Root_1 = __webpack_require__(28);
var route_factory_1 = __webpack_require__(31);
var data_1 = __webpack_require__(32);
var routesFactory = new route_factory_1.default();
var routes = routesFactory.getRoutes(data_1.default);
var serverRender = function (locals) {
    var renderer = new server_1.ServerRenderer(locals.Root || Root_1.default);
    return renderer.render(locals, data_1.default, routes);
};
var clientRender = function () {
    var container = document.getElementById('root');
    var child = react_1.createElement(react_router_dom_1.Switch, {}, routes.map(function (e) { return e.route; }));
    var router = react_1.createElement(react_router_dom_1.BrowserRouter, {}, child);
    var app = react_1.createElement(react_hot_loader_1.AppContainer, {}, router);
    react_dom_1.render(app, container);
};
if (typeof window !== 'undefined') {
    if (document.readyState === 'complete') {
        clientRender();
    }
    else {
        window.addEventListener('load', clientRender);
    }
}
exports.default = serverRender;
if (false) {
    module.hot.accept('./data', clientRender);
}


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_21__;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23)


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable global-require */

if (true) {
  module.exports = __webpack_require__(24);
} else {
  module.exports = require('./index.dev');
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports.AppContainer = __webpack_require__(25);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable global-require */

if (true) {
  module.exports = __webpack_require__(26);
} else {
  module.exports = require('./AppContainer.dev');
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/prop-types */

var React = __webpack_require__(0);

var Component = React.Component;

var AppContainer = function (_Component) {
  _inherits(AppContainer, _Component);

  function AppContainer() {
    _classCallCheck(this, AppContainer);

    return _possibleConstructorReturn(this, (AppContainer.__proto__ || Object.getPrototypeOf(AppContainer)).apply(this, arguments));
  }

  _createClass(AppContainer, [{
    key: 'render',
    value: function render() {
      if (this.props.component) {
        return React.createElement(this.props.component, this.props.props);
      }

      return React.Children.only(this.props.children);
    }
  }]);

  return AppContainer;
}(Component);

module.exports = AppContainer;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(3);
var server_1 = __webpack_require__(11);
var ServerRenderer = /** @class */ (function () {
    function ServerRenderer(Root) {
        this.Root = Root;
    }
    ServerRenderer.prototype.render = function (locals, website, routes) {
        var _this = this;
        var routeSwitch = react_1.createElement(react_router_dom_1.Switch, {}, routes.map(function (r) { return r.route; }));
        return routes.reduce(function (result, _a) {
            var page = _a.page, route = _a.route;
            // react root contents rendered with react ids
            var router = react_1.createElement(react_router_dom_1.StaticRouter, getRouterProps(page.url), routeSwitch);
            var body = server_1.renderToString(router);
            // site skeleton rendered without react ids
            var root = react_1.createElement(_this.Root, getRootProps(locals, website, page));
            var html = server_1.renderToStaticMarkup(root);
            result[page.url] = '<!DOCTYPE html>\n' + html.replace("%%%BODY%%%", body);
            return result;
        }, {});
    };
    return ServerRenderer;
}());
exports.ServerRenderer = ServerRenderer;
exports.default = ServerRenderer;
function getRouterProps(location) {
    return { location: location, context: {} };
}
function getRootProps(locals, website, page) {
    var assets = Object.keys(locals.webpackStats.compilation.assets)
        .map(function (url) { return "/" + url; });
    var css = assets.filter(function (value) { return value.match(/\.css$/); });
    var js = assets.filter(function (value) { return value.match(/\.js$/); });
    return {
        website: website,
        page: page,
        localBundles: { css: css, js: js },
        externalBundles: { css: locals.css || [], js: locals.js || [] },
    };
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var DeferredScripts_1 = __webpack_require__(29);
var DeferredStyles_1 = __webpack_require__(30);
function Root(_a) {
    var website = _a.website, page = _a.page, localBundles = _a.localBundles, externalBundles = _a.externalBundles;
    return (React.createElement("html", null,
        React.createElement("head", null,
            React.createElement("title", null,
                page.title,
                " | ",
                website.title),
            React.createElement("meta", { name: 'path', content: page.url }),
            React.createElement("meta", { name: 'keywords', content: page.tags.join(', ') }),
            React.createElement("meta", { name: 'description', content: page.description }),
            React.createElement("meta", { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
            localBundles.css.map(function (url) { return (React.createElement("link", { type: 'text/css', rel: 'stylesheet', href: url, key: url })); })),
        React.createElement("body", null,
            React.createElement("div", { id: 'root' }, "%%%BODY%%%"),
            React.createElement(DeferredScripts_1.default, { srcs: externalBundles.js.concat(localBundles.js) }),
            React.createElement(DeferredStyles_1.default, { hrefs: externalBundles.css }))));
}
exports.Root = Root;
exports.default = Root;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var LOAD_SCRIPTS_SOURCE = loadScripts.toString().replace(/\n/g, '').replace(/  +/g, ' ');
function DeferredScripts(_a) {
    var srcs = _a.srcs;
    var code = LOAD_SCRIPTS_SOURCE + "loadScripts(" + JSON.stringify(srcs) + ");";
    return (React.createElement("script", { type: 'text/javascript', dangerouslySetInnerHTML: { __html: code } }));
}
exports.DeferredScripts = DeferredScripts;
exports.default = DeferredScripts;
function loadScripts(srcs) {
    window.addEventListener('load', function () {
        var head = document.getElementsByTagName('head')[0];
        function load(src, onLoad) {
            var script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', src);
            script.onload = onLoad;
            head.appendChild(script);
        }
        function loadNext() {
            var src = srcs.shift();
            var onLoad = srcs.length === 0 ? function () { } : loadNext;
            load(src, onLoad);
        }
        loadNext();
    });
}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var LOAD_STYLES_SOURCE = loadStyles.toString().replace(/\n/g, '').replace(/  +/g, ' ');
function DeferredStyles(_a) {
    var hrefs = _a.hrefs;
    var code = LOAD_STYLES_SOURCE + "loadStyles(" + JSON.stringify(hrefs) + ");";
    return (React.createElement("script", { type: 'text/javascript', dangerouslySetInnerHTML: { __html: code } }));
}
exports.DeferredStyles = DeferredStyles;
exports.default = DeferredStyles;
function loadStyles(hrefs) {
    window.addEventListener('load', function () {
        var head = document.getElementsByTagName('head')[0];
        hrefs.forEach(function (href) {
            var link = document.createElement('link');
            link.setAttribute('href', href);
            link.setAttribute('type', 'text/css');
            link.setAttribute('rel', 'stylesheet');
            head.appendChild(link);
        });
    });
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(3);
var NOT_FOUND_URL = '/404';
var RoutesFactory = /** @class */ (function () {
    function RoutesFactory() {
    }
    RoutesFactory.prototype.getRoutes = function (website) {
        var error404 = website.pages[NOT_FOUND_URL];
        if (error404 === undefined) {
            throw new Error("couldn't find page of url " + NOT_FOUND_URL);
        }
        function createRoute(page, path, exact) {
            if (path === void 0) { path = page.url; }
            if (exact === void 0) { exact = true; }
            var component = function () { return react_1.createElement(page.layout.component, { website: website, page: page }); };
            var routeProps = { page: page, path: path, exact: exact, key: path, component: component };
            var route = react_1.createElement(react_router_dom_1.Route, routeProps);
            return { page: page, route: route };
        }
        var routes = [].concat.call(
        // categories
        Object.keys(website.categories)
            .map(function (title) { return website.categories[title]; })
            .filter(function (category) { return category.output; })
            .map(function (category) { return createRoute(category); }), 
        // tags
        Object.keys(website.tags)
            .map(function (title) { return createRoute(website.tags[title]); }), 
        // pages
        Object.keys(website.pages)
            .map(function (title) { return website.pages[title]; })
            .filter(function (page) { return page.output; })
            .map(function (page) { return createRoute(page); }), 
        // 404 with exact = false (must be at the end)
        [
            createRoute(error404, '/', false),
        ]);
        return routes;
    };
    return RoutesFactory;
}());
exports.RoutesFactory = RoutesFactory;
;
exports.default = RoutesFactory;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(0);
var server_1 = __webpack_require__(11);
var react_router_dom_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(33);
var models_1 = __webpack_require__(1);
var layouts_1 = __webpack_require__(14);
var includes_1 = __webpack_require__(2);
var collections_1 = __webpack_require__(9);
var pages_1 = __webpack_require__(17);
var categories_1 = __webpack_require__(18);
var tags_1 = __webpack_require__(54);
var menu_1 = __webpack_require__(55);
var config = __webpack_require__(10);
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
    .filter(function (page) { return page.feed && page.output; })
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
    if (page.description || !page.output) {
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
// check for missing descriptions
var missingDescription = pages_1.default
    .concat(categories_1.default)
    .concat(tags_1.default)
    .filter(function (p) { return p.description === '' && p.output; })
    .map(function (p) { return p.title; });
if (missingDescription.length !== 0) {
    throw new Error("Description missing in pages " + JSON.stringify(missingDescription) + ". Write some text in the article or add 'description' field.");
}
// if absent, set image to first img src found in content
pages_1.default.forEach(function (page) {
    if (page.image || !page.output) {
        return;
    }
    Object.defineProperty(page, 'image', {
        get: function () { return imageFromContent(page); },
        set: function () { throw new Error('Page.image is readonly'); }
    });
});
function descriptionFromContent(page) {
    var element = react_1.createElement(page.body, { website: website, page: page, respectLimit: true });
    var router = react_1.createElement(react_router_dom_1.StaticRouter, { location: page.url, context: {} }, element);
    return removeEntities(utils_1.stripTags(server_1.renderToStaticMarkup(router)));
}
function descriptionFromPages(page) {
    return removeEntities(index.title + " " + page.title + ": " + page.pages.map(function (p) { return p.title; }).join(', '));
}
function imageFromContent(page) {
    var element = react_1.createElement(page.body, { website: website, page: page, respectLimit: false });
    var router = react_1.createElement(react_router_dom_1.StaticRouter, { location: page.url, context: {} }, element);
    var markup = server_1.renderToStaticMarkup(router);
    var found = /<img[^>]* src="([^"]*)"[^>]*>/.exec(markup);
    if (!found) {
        console.warn("Couldn't find image on page " + page.url + "; page.image is null");
        return null;
    }
    return found[1];
}
function checkIsString(value, name) {
    if (typeof value !== 'string') {
        throw new Error(name + " must be a string; got " + value + " (" + typeof value + ")");
    }
    return value;
}
function removeEntities(str) {
    return str
        .replace(/&nbsp;/g, ' ')
        .replace(/&[^\s;]+;/g, '');
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function stripTags(htmlText) {
    var uIndentionChar = "-";
    var oIndentionChar = "-";
    // removel all \n linebreaks
    var tmp = String(htmlText).replace(/\n|\r/g, " ");
    // remove everything before and after <body> tags including the tag itself
    tmp = tmp.replace(/<\/body>.*/i, "");
    tmp = tmp.replace(/.*<body[^>]*>/i, "");
    // remove inbody scripts and styles
    tmp = tmp.replace(/<(script|style)( [^>]*)*>((?!<\/\1( [^>]*)*>).)*<\/\1>/gi, "");
    // remove all tags except that are being handled separately
    tmp = tmp.replace(/<(\/)?((?!h[1-6]( [^>]*)*>)(?!img( [^>]*)*>)(?!a( [^>]*)*>)(?!ul( [^>]*)*>)(?!ol( [^>]*)*>)(?!li( [^>]*)*>)(?!p( [^>]*)*>)(?!div( [^>]*)*>)(?!td( [^>]*)*>)(?!br( [^>]*)*>)[^>\/])[^>]*>/gi, "");
    // remove images
    tmp = tmp.replace(/<img([^>]*)>/gi, '');
    function createListReplaceCb() {
        return function (match, listType, listAttributes, listBody) {
            var liIndex = 0;
            var startMatch;
            if (listAttributes && (startMatch = /start="([0-9]+)"/i.exec(listAttributes)) !== null) {
                liIndex = parseInt(startMatch[1]) - 1;
            }
            var plainListItem = "<p>" + listBody.replace(/<li[^>]*>(((?!<li[^>]*>)(?!<\/li>).)*)<\/li>/gi, function (str, listItem) {
                var actSubIndex = 0;
                var plainListLine = listItem.replace(/(^|(<br \/>))(?!<p>)/gi, function () {
                    if (listType === "o" && actSubIndex === 0) {
                        liIndex += 1;
                        actSubIndex += 1;
                        return "<br />" + liIndex + oIndentionChar;
                    }
                    return "<br />";
                });
                return plainListLine;
            }) + "</p>";
            return plainListItem;
        };
    }
    // handle lists
    tmp = tmp.replace(/<\/?ul[^>]*>|<\/?ol[^>]*>|<\/?li[^>]*>/gi, "");
    // handle headings
    tmp = tmp.replace(/<h([1-6])[^>]*>([^<]*)<\/h\1>/gi, " $2 ");
    // replace <br>s, <td>s, <divs> and <p>s with linebreaks
    tmp = tmp.replace(/<br( [^>]*)*>|<p( [^>]*)*>|<\/p( [^>]*)*>|<div( [^>]*)*>|<\/div( [^>]*)*>|<td( [^>]*)*>|<\/td( [^>]*)*>/gi, "");
    // replace <a href>b<a> links with b (href)
    tmp = tmp.replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a[^>]*>/gi, function (str, href, linkText) {
        return " " + linkText + " ";
    });
    // remove duplicated spaces including non braking spaces
    tmp = tmp.replace(/( |&nbsp;|\t)+/gi, " ");
    // remove line starter spaces
    tmp = tmp.replace(/\n +/gi, "");
    // remove content starter spaces
    tmp = tmp.replace(/^ +/gi, "");
    return tmp;
}
exports.stripTags = stripTags;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Collection = /** @class */ (function () {
    function Collection(title, layout, output) {
        this.pages = [];
        this.title = title;
        this.layout = layout;
        this.output = output;
    }
    return Collection;
}());
exports.default = Collection;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Layout = /** @class */ (function () {
    function Layout(name, component) {
        this.name = name;
        this.component = component;
    }
    return Layout;
}());
exports.default = Layout;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Include = /** @class */ (function () {
    function Include(name, component) {
        this.name = name;
        this.component = component;
    }
    return Include;
}());
exports.default = Include;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MenuEntry = /** @class */ (function () {
    function MenuEntry(title, short, url, icon) {
        this.title = title;
        this.short = short;
        this.url = url;
        this.icon = icon;
    }
    return MenuEntry;
}());
exports.default = MenuEntry;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Category_1 = __webpack_require__(12);
var Tag_1 = __webpack_require__(13);
var Website = /** @class */ (function () {
    function Website(title, baseUrl, timezone, locale) {
        this.layouts = {};
        this.includes = {};
        this.collections = {};
        this.categories = {};
        this.tags = {};
        this.pages = {};
        this.entities = {};
        this.title = title;
        this.baseUrl = baseUrl;
        this.timezone = timezone;
        this.locale = locale;
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


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./blog.markdown": 40
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 39;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raw = exports.body = exports.frontMatter = exports.component = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Content = __webpack_require__(5);

var _Content2 = _interopRequireDefault(_Content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.__data = __webpack_require__(2).default;

var code = global.__data.map(function (entry, index) {
  return 'var ' + entry.name + ' = this.__data[' + index + '].component;';
}).join('');eval.call(null, code);
delete global.__data;

var component = exports.component = function component(data) {
  return _react2.default.createElement(
    _Content2.default,
    _extends({ limit: 5 }, data),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(Feed, _extends({}, data, { feed: data.website.getCollectionOfTitle('Posts').pages }))
    )
  );
};
var frontMatter = exports.frontMatter = { "title": "Blog", "date": "2018-02-03T15:55:00.000Z", "tags": ["paramorph", "static", "blog", "generator", "news", "changelog"], "role": "category" };
var body = exports.body = "<div>\n  <Feed { ...data } feed={ data.website.getCollectionOfTitle('Posts').pages } />\n</div>\n";
var raw = exports.raw = "\n<div>\n  <Feed { ...data } feed={ data.website.getCollectionOfTitle('Posts').pages } />\n</div>\n\n";
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./404.markdown": 42,
	"./contact.markdown": 43,
	"./index.markdown": 44,
	"./sitemap.markdown": 45,
	"./tag.markdown": 46
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 41;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raw = exports.body = exports.frontMatter = exports.component = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Content = __webpack_require__(5);

var _Content2 = _interopRequireDefault(_Content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.__data = __webpack_require__(2).default;

var code = global.__data.map(function (entry, index) {
  return 'var ' + entry.name + ' = this.__data[' + index + '].component;';
}).join('');eval.call(null, code);
delete global.__data;

var component = exports.component = function component(data) {
  return _react2.default.createElement(
    _Content2.default,
    _extends({ limit: 5 }, data),
    _react2.default.createElement(
      'p',
      null,
      'Page of requested address does not exist.'
    ),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'a',
        { href: '/' },
        'Home'
      )
    )
  );
};
var frontMatter = exports.frontMatter = { "title": "Not Found", "date": "1900-01-01T00:00:00.000Z", "output": false };
var body = exports.body = "<p>Page of requested address does not exist.</p>\n<p><a href=\"/\">Home</a></p>\n";
var raw = exports.raw = "\nPage of requested address does not exist.\n\n[Home](/)\n\n";
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raw = exports.body = exports.frontMatter = exports.component = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Content = __webpack_require__(5);

var _Content2 = _interopRequireDefault(_Content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.__data = __webpack_require__(2).default;

var code = global.__data.map(function (entry, index) {
  return 'var ' + entry.name + ' = this.__data[' + index + '].component;';
}).join('');eval.call(null, code);
delete global.__data;

var component = exports.component = function component(data) {
  return _react2.default.createElement(
    _Content2.default,
    _extends({ limit: 5 }, data),
    _react2.default.createElement(
      'h2',
      null,
      'Maciej Cha\u0142apuk'
    ),
    _react2.default.createElement(
      'ul',
      null,
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'a',
          { href: 'https://github.com/mchalapuk' },
          'github.com/mchalapuk'
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'a',
          { href: 'https://twitter.com/mchalapuk' },
          '@mchalapuk'
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'a',
          { href: 'mailto:maciej@chalapuk.pl' },
          'maciej@chalapuk.pl'
        )
      )
    )
  );
};
var frontMatter = exports.frontMatter = { "title": "Contact", "date": "2018-02-03T13:58:00.000Z", "permalink": "/contact", "tags": ["paramorph", "contact", "info"], "feed": false };
var body = exports.body = "<h2>Maciej Chałapuk</h2>\n<ul>\n<li><a href=\"https://github.com/mchalapuk\">github.com/mchalapuk</a></li>\n<li><a href=\"https://twitter.com/mchalapuk\">@mchalapuk</a></li>\n<li><a href=\"mailto:maciej@chalapuk.pl\">maciej@chalapuk.pl</a></li>\n</ul>\n";
var raw = exports.raw = "\n## Maciej Chałapuk\n\n * [github.com/mchalapuk][github]\n * [@mchalapuk][twitter]\n * [maciej@chalapuk.pl][email]\n\n[github]: https://github.com/mchalapuk\n[twitter]: https://twitter.com/mchalapuk\n[email]: mailto:maciej@chalapuk.pl\n\n";
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raw = exports.body = exports.frontMatter = exports.component = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Content = __webpack_require__(5);

var _Content2 = _interopRequireDefault(_Content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.__data = __webpack_require__(2).default;

var code = global.__data.map(function (entry, index) {
  return 'var ' + entry.name + ' = this.__data[' + index + '].component;';
}).join('');eval.call(null, code);
delete global.__data;

var component = exports.component = function component(data) {
  return _react2.default.createElement(
    _Content2.default,
    _extends({ limit: 5 }, data),
    _react2.default.createElement(
      'ul',
      null,
      _react2.default.createElement(
        'li',
        null,
        'static page rendering,'
      ),
      _react2.default.createElement(
        'li',
        null,
        'isomorphic app compilation,'
      ),
      _react2.default.createElement(
        'li',
        null,
        'compile-time image processing,'
      ),
      _react2.default.createElement(
        'li',
        null,
        'supports JavaScript and TypeScript,'
      ),
      _react2.default.createElement(
        'li',
        null,
        'enables using React inside Markdown,'
      ),
      _react2.default.createElement(
        'li',
        null,
        'extensible via Webpack plugins.'
      )
    )
  );
};
var frontMatter = exports.frontMatter = { "title": "Paramorph - Isomorphic Static Website Generator", "date": "2018-02-03T13:58:00.000Z", "permalink": "/", "tags": ["paramorph", "isomorphic", "static", "website", "generator", "react", "webpack"] };
var body = exports.body = "<ul>\n<li>static page rendering,</li>\n<li>isomorphic app compilation,</li>\n<li>compile-time image processing,</li>\n<li>supports JavaScript and TypeScript,</li>\n<li>enables using React inside Markdown,</li>\n<li>extensible via Webpack plugins.</li>\n</ul>\n";
var raw = exports.raw = "\n * static page rendering,\n * isomorphic app compilation,\n * compile-time image processing,\n * supports JavaScript and TypeScript,\n * enables using React inside Markdown,\n * extensible via Webpack plugins.\n\n";
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raw = exports.body = exports.frontMatter = exports.component = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Content = __webpack_require__(5);

var _Content2 = _interopRequireDefault(_Content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.__data = __webpack_require__(2).default;

var code = global.__data.map(function (entry, index) {
  return 'var ' + entry.name + ' = this.__data[' + index + '].component;';
}).join('');eval.call(null, code);
delete global.__data;

var component = exports.component = function component(data) {
  return _react2.default.createElement(
    _Content2.default,
    _extends({ limit: 5 }, data),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(TableOfContents, data)
    )
  );
};
var frontMatter = exports.frontMatter = { "title": "Site Map", "date": "2017-02-03T21:55:00.000Z", "permalink": "/sitemap", "tags": ["sitemap", "for bot"] };
var body = exports.body = "<div>\n  <TableOfContents {...data} />\n</div>\n";
var raw = exports.raw = "\n<div>\n  <TableOfContents {...data} />\n</div>\n\n";
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raw = exports.body = exports.frontMatter = exports.component = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Content = __webpack_require__(5);

var _Content2 = _interopRequireDefault(_Content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.__data = __webpack_require__(2).default;

var code = global.__data.map(function (entry, index) {
  return 'var ' + entry.name + ' = this.__data[' + index + '].component;';
}).join('');eval.call(null, code);
delete global.__data;

var component = exports.component = function component(data) {
  return _react2.default.createElement(
    _Content2.default,
    _extends({ limit: 5 }, data),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(Feed, _extends({}, data, { feed: data.page.pages }))
    )
  );
};
var frontMatter = exports.frontMatter = { "title": "Tag", "date": "1900-01-01T00:00:00.000Z", "output": false };
var body = exports.body = "<div>\n  <Feed { ...data } feed={ data.page.pages } />\n</div>\n";
var raw = exports.raw = "\n<div>\n  <Feed { ...data } feed={ data.page.pages } />\n</div>\n\n";
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./2018-02-03-first-post.markdown": 48
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 47;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raw = exports.body = exports.frontMatter = exports.component = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Content = __webpack_require__(5);

var _Content2 = _interopRequireDefault(_Content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.__data = __webpack_require__(2).default;

var code = global.__data.map(function (entry, index) {
  return 'var ' + entry.name + ' = this.__data[' + index + '].component;';
}).join('');eval.call(null, code);
delete global.__data;

var component = exports.component = function component(data) {
  return _react2.default.createElement(
    _Content2.default,
    _extends({ limit: 5 }, data),
    _react2.default.createElement(
      'p',
      null,
      'While we\u2019ve been field testing for few months now (',
      _react2.default.createElement(
        'a',
        { href: 'http://sztukauniwersalna.pl' },
        'sztukauniwersalna.pl'
      ),
      ' is generated by using paramorph), today we start using ourselves to generate ',
      _react2.default.createElement(
        'a',
        { href: 'http://paramorph.github.io' },
        'paramorph.github.io'
      ),
      ' website.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'This is also a first post of paramorph\u2019s blog. Hooray!'
    ),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement('img', { src: 'https://paramorph.github.io/media/logo.svg', alt: 'Paramorph Logo' })
    )
  );
};
var frontMatter = exports.frontMatter = { "title": "Hello, Paramorph", "date": "2018-02-03T13:58:00.000Z", "tags": ["paramorph", "test", "firstpost"] };
var body = exports.body = "<p>While we’ve been field testing for few months now (<a href=\"http://sztukauniwersalna.pl\">sztukauniwersalna.pl</a> is generated by using\nparamorph), today we start using ourselves to generate <a href=\"http://paramorph.github.io\">paramorph.github.io</a> website.</p>\n<p>This is also a first post of paramorph’s blog. Hooray!</p>\n<p><img src=\"https://paramorph.github.io/media/logo.svg\" alt=\"Paramorph Logo\" /></p>\n";
var raw = exports.raw = "\nWhile we've been field testing for few months now (sztukauniwersalna.pl is generated by using\nparamorph), today we start using ourselves to generate paramorph.github.io website.\n\nThis is also a first post of paramorph's blog. Hooray!\n\n![Paramorph Logo](https://paramorph.github.io/media/logo.svg)\n\n";
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 49 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 49;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./default.tsx": 51
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 50;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(3);
var DefaultLayout = /** @class */function (_super) {
    __extends(DefaultLayout, _super);
    function DefaultLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultLayout.prototype.render = function () {
        var _a = this.props,
            website = _a.website,
            page = _a.page;
        var Body = page.body;
        return React.createElement("div", null, React.createElement("div", { className: 'header' }, React.createElement("nav", null, React.createElement("ul", null, website.menu.map(function (entry) {
            return React.createElement("li", { key: entry.url }, React.createElement(react_router_dom_1.Link, { to: entry.url }, entry.short));
        })))), React.createElement("div", { className: 'main' }, React.createElement("main", null, React.createElement("div", { className: 'title' }, React.createElement("h1", null, React.createElement(react_router_dom_1.Link, { to: page.url }, page.title)), React.createElement("ul", { className: 'tags' }, page.tags.map(function (title) {
            return website.getTagOfTitle(title);
        }).map(function (_a) {
            var title = _a.title,
                url = _a.url;
            return React.createElement("li", { key: url }, React.createElement(react_router_dom_1.Link, { to: url }, title));
        }))), React.createElement(Body, { website: website, page: page }))), React.createElement("div", { className: 'footer' }, React.createElement("nav", null, React.createElement("ul", null, website.menu.map(function (entry) {
            return React.createElement("li", { key: entry.url }, React.createElement(react_router_dom_1.Link, { to: entry.url }, entry.short));
        }), React.createElement("li", null, React.createElement(react_router_dom_1.Link, { to: '/sitemap' }, "Sitemap"))))));
    };
    return DefaultLayout;
}(React.Component);
exports.DefaultLayout = DefaultLayout;
exports.default = DefaultLayout;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Feed/index.tsx": 53,
	"./TableOfContents/index.tsx": 16,
	"./Tile/index.tsx": 15
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 52;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Tile_1 = __webpack_require__(15);
var TableOfContents_1 = __webpack_require__(16);
;
function Feed(_a) {
    var website = _a.website,
        page = _a.page,
        feed = _a.feed,
        _b = _a.respectLimit,
        respectLimit = _b === void 0 ? false : _b,
        props = __rest(_a, ["website", "page", "feed", "respectLimit"]);
    var pages = feed.filter(function (page) {
        return page.feed;
    });
    if (respectLimit) {
        return React.createElement(TableOfContents_1.Branch, __assign({ pages: pages, shallow: true }, props));
    }
    return React.createElement("div", null, pages.sort(function (a, b) {
        return b.compareTo(a);
    }).map(function (page) {
        return React.createElement(Tile_1.default, { key: page.url, page: page, website: website });
    }));
}
exports.Feed = Feed;
exports.default = Feed;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = __webpack_require__(1);
var pages_1 = __webpack_require__(17);
var categories_1 = __webpack_require__(18);
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


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = __webpack_require__(1);
var config = __webpack_require__(10);
function checkIsArray(value, name) {
    if (!(value instanceof Array)) {
        throw new Error(name + " must be an array; got " + typeof value);
    }
    return value;
}
function checkIsString(value, name) {
    if (typeof value != 'string') {
        throw new Error(name + " must be a string; got " + typeof value);
    }
    return value;
}
checkIsArray(config.menu, 'config.menu');
var isLocalUrl = function (url) { return url.charAt(0) == '/' && url.charAt(1) != '/'; };
function warnIfNotAPageOrCategory(url, requiredBy) {
    /**
      if (isLocalUrl(url) && website.pages[url] == undefined && website.categories[url] == undefined) {
        console.warn(`page of url \'${url}\' required by ${requiredBy} is not defined`);
      }
    **/
    return url;
}
var menu = config.menu.map(function (cfg, i) {
    return new models_1.MenuEntry(checkIsString(cfg.title, "menu[" + i + "].title"), checkIsString(cfg.short, "menu[" + i + "].short"), warnIfNotAPageOrCategory(checkIsString(cfg.url, "menu[" + i + "].url"), "menu entry '" + cfg.title + "'"), cfg.icon && checkIsString(cfg.icon, "menu[" + i + "].icon"));
});
exports.default = menu;


/***/ })
/******/ ]);
});