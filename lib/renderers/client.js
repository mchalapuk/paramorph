"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var universal_router_1 = require("universal-router");
var history_1 = require("history");
var ContextContainer_1 = require("./ContextContainer");
var ClientRenderer = /** @class */ (function () {
    function ClientRenderer() {
    }
    ClientRenderer.prototype.render = function (containerId, paramorph, routes) {
        var container = document.getElementById(containerId);
        var router = new universal_router_1.default(routes);
        var history = history_1.createBrowserHistory();
        function resolve(page) {
            router.resolve(page.url)
                .then(function (component) {
                var app = react_1.createElement(ContextContainer_1.ContextContainer, { history: history, paramorph: paramorph, page: page }, component);
                react_dom_1.render(app, container);
            });
        }
        var pages = paramorph.pages;
        var notFound = pages['/404'];
        var unlisten = history.listen(function (location) { return resolve(pages[location.pathname] || notFound); });
        window.addEventListener('unload', unlisten);
        var initialPage = pages[history.location.pathname] || notFound;
        resolve(initialPage);
    };
    return ClientRenderer;
}());
exports.ClientRenderer = ClientRenderer;
exports.default = ClientRenderer;
//# sourceMappingURL=client.js.map