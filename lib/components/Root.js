"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Root(_a) {
    var page = _a.page, localBundles = _a.localBundles, externalBundles = _a.externalBundles;
    return (React.createElement("html", null,
        React.createElement("head", null,
            React.createElement("title", null, page.title),
            React.createElement("meta", { name: 'path', content: page.url }),
            React.createElement("meta", { name: 'keywords', content: page.tags.join(', ') }),
            React.createElement("meta", { name: 'description', content: page.description }),
            React.createElement("meta", { name: 'viewport', content: 'width=device-width; initial-scale=1.0' }),
            localBundles.css.map(function (url) { return (React.createElement("link", { type: 'text/css', rel: 'stylesheet', href: url, key: url })); })),
        React.createElement("body", null,
            React.createElement("div", { id: 'root' }, "%%%BODY%%%"),
            externalBundles.js.map(function (src) { return (React.createElement("script", { type: 'text/javascript', src: src, key: src })); }),
            localBundles.js.map(function (src) { return (React.createElement("script", { type: 'text/javascript', src: src, key: src })); }),
            externalBundles.css.map(function (src) { return (React.createElement("link", { type: 'text/css', rel: 'stylesheet', href: src, key: src })); }))));
}
exports.Root = Root;
exports.default = Root;
