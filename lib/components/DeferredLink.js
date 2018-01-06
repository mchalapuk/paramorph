"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var LOAD_LINK_SOURCE = loadLink.toString().replace(/\s/g, '');
function DeferredLink(_a) {
    var href = _a.href, rel = _a.rel;
    return (React.createElement("script", { type: 'text/javascript', dangerouslySetInnerHTML: { __html: "(function(){\n" + LOAD_LINK_SOURCE + "loadLink('" + href + "','" + rel + "');})();" } }));
}
exports.DeferredLink = DeferredLink;
exports.default = DeferredLink;
function loadLink(href, rel) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.setAttribute('href', href);
    link.setAttribute('type', rel);
    head.appendChild(link);
}
