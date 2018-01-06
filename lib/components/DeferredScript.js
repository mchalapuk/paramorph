"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var LOAD_SCRIPT_SOURCE = loadScript.toString().replace(/\s/g, '');
function DeferredScript(_a) {
    var src = _a.src;
    return (React.createElement("script", { type: 'text/javascript', dangerouslySetInnerHTML: { __html: "(function(){\n" + LOAD_SCRIPT_SOURCE + "loadScript('" + src + "');})();" } }));
}
exports.DeferredScript = DeferredScript;
exports.default = DeferredScript;
function loadScript(src) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', src);
    head.appendChild(script);
}
