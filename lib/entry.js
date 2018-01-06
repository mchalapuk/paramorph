"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var react_hot_loader_1 = require("react-hot-loader");
var server_1 = require("./renderers/server");
var Root_1 = require("./components/Root");
var route_factory_1 = require("./route-factory");
var data_1 = require("./data");
var routesFactory = new route_factory_1.default();
var routes = routesFactory.getRoutes(data_1.default);
var serverRender = function (locals) {
    var renderer = new server_1.ServerRenderer(locals.Root || Root_1.default);
    return renderer.render(locals, data_1.default, routes);
};
var clientRender = function () {
    var container = document.getElementById('root');
    var child = react_1.createElement(react_router_dom_1.Switch, {}, routes.map(function (e) { return e.route; }));
    var router = react_1.createElement(react_router_dom_1.BrowserRouter, {}, child);
    var app = react_1.createElement(react_hot_loader_1.AppContainer, {}, router);
    react_dom_1.render(app, container);
};
if (typeof window !== 'undefined') {
    window.addEventListener('load', clientRender);
}
exports.default = serverRender;
if (module.hot) {
    module.hot.accept('./data', clientRender);
}
