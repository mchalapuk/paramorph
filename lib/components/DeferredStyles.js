"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
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
