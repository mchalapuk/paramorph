"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Root(_a) {
    var website = _a.website, page = _a.page, localBundles = _a.localBundles, externalBundles = _a.externalBundles, meta = _a.meta;
    return (React.createElement("html", null,
        React.createElement("head", null,
            React.createElement("title", null,
                page.title,
                " | ",
                website.title),
            React.createElement("meta", { name: 'path', content: page.url }),
            React.createElement("meta", { name: 'keywords', content: page.tags.join(', ') }),
            React.createElement("meta", { name: 'description', content: page.description }),
            React.createElement("meta", { name: 'viewport', content: 'width=device-width; initial-scale=1.0' }),
            localBundles.css.map(function (url) { return (React.createElement("link", { type: 'text/css', rel: 'stylesheet', href: url, key: url })); }),
            React.createElement("meta", { property: 'og:url', content: "" + website.baseUrl + page.url }),
            React.createElement("meta", { property: 'og:title', content: page.title }),
            page.image !== null ? React.createElement("meta", { property: 'og:image', content: page.image }) : null,
            React.createElement("meta", { property: 'og:description', content: page.description }),
            React.createElement("meta", { property: 'og:locale', content: website.locale }),
            React.createElement("meta", { property: 'og:type', content: page.url === '/' ? 'website' : 'article' }),
            meta.map(function (props, key) { return (React.createElement("meta", __assign({}, props, { key: key }))); })),
        React.createElement("body", null,
            React.createElement("div", { id: 'root' }, "%%%BODY%%%"),
            externalBundles.js.map(function (url) { return (React.createElement("script", { type: 'text/javascript', src: url, key: url })); }),
            localBundles.js.map(function (url) { return (React.createElement("script", { type: 'text/javascript', src: url, key: url })); }),
            externalBundles.css.map(function (url) { return (React.createElement("link", { type: 'text/css', rel: 'stylesheet', href: url, key: url })); }))));
}
exports.Root = Root;
exports.default = Root;
