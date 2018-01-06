"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var DeferredScript_1 = require("./DeferredScript");
var DeferredLink_1 = require("./DeferredLink");
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
            React.createElement("meta", { name: 'viewport', content: 'width=device-width; initial-scale=1.0' }),
            localBundles.css.map(function (url) { return (React.createElement("link", { type: 'text/css', rel: 'stylesheet', href: url, key: url })); })),
        React.createElement("body", null,
            React.createElement("div", { id: 'root' }, "%%%BODY%%%"),
            externalBundles.js.map(function (url) { return (React.createElement(DeferredScript_1.default, { src: url, key: url })); }),
            localBundles.js.map(function (url) { return (React.createElement(DeferredScript_1.default, { src: url, key: url })); }),
            externalBundles.css.map(function (url) { return (React.createElement(DeferredLink_1.default, { href: url, rel: 'stylesheet', key: url })); }))));
}
exports.Root = Root;
exports.default = Root;
