"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
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
//# sourceMappingURL=DeferredScripts.js.map