"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Root(_a) {
    var title = _a.title, path = _a.path, tags = _a.tags, description = _a.description, css = _a.css, bundles = _a.bundles, externalScripts = _a.externalScripts, externalStylesheets = _a.externalStylesheets;
    return (React.createElement("html", null,
        React.createElement("head", null,
            React.createElement("title", null, title),
            React.createElement("meta", { name: 'path', content: path }),
            React.createElement("meta", { name: 'keywords', content: tags.join(', ') }),
            React.createElement("meta", { name: 'description', content: description }),
            React.createElement("meta", { name: 'viewport', content: 'width=device-width; initial-scale=1.0' }),
            React.createElement("style", { type: 'text/css' }, css.join(''))),
        React.createElement("body", null,
            React.createElement("div", { id: 'root' }, "%%%BODY%%%"),
            externalScripts.map(function (src) { return (React.createElement("script", { type: 'text/javascript', src: src, key: src })); }),
            bundles.map(function (src) { return (React.createElement("script", { type: 'text/javascript', src: src, key: src })); }),
            externalStylesheets.map(function (src) { return (React.createElement("link", { type: 'text/css', rel: 'stylesheet', href: src, key: src })); }))));
}
exports.Root = Root;
exports.default = Root;
//# sourceMappingURL=Root.js.map