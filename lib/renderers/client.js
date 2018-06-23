"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var react_hot_loader_1 = require("react-hot-loader");
var react_router_dom_1 = require("react-router-dom");
var ClientRenderer = /** @class */ (function () {
    function ClientRenderer() {
    }
    ClientRenderer.prototype.render = function (containerId, routes) {
        var container = document.getElementById(containerId);
        var child = react_1.createElement(react_router_dom_1.Switch, {}, routes.map(function (e) { return e.route; }));
        var router = react_1.createElement(react_router_dom_1.BrowserRouter, {}, child);
        var app = react_1.createElement(react_hot_loader_1.AppContainer, {}, router);
        react_dom_1.render(app, container);
    };
    return ClientRenderer;
}());
exports.ClientRenderer = ClientRenderer;
exports.default = ClientRenderer;
//# sourceMappingURL=client.js.map