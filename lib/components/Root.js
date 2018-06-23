"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var DeferredScripts_1 = require("./DeferredScripts");
var DeferredStyles_1 = require("./DeferredStyles");
function Root(_a) {
    var paramorph = _a.paramorph, page = _a.page, localBundles = _a.localBundles, externalBundles = _a.externalBundles;
    return (React.createElement("html", null,
        React.createElement("head", null,
            React.createElement("title", null,
                page.title,
                " | ",
                paramorph.config.title),
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
//# sourceMappingURL=Root.js.map