"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
var history_1 = require("history");
var server_1 = require("./renderers/server");
var client_1 = require("./renderers/client");
var router_1 = require("./router");
var route_factory_1 = require("./route-factory");
var paramorph = require('@website/_config.yml');
var routesFactory = new route_factory_1.default();
var routes = routesFactory.getRoutes(paramorph);
var router = new router_1.UniversalRouter(routes);
var serverRender = function (locals) {
    var history = history_1.createMemoryHistory();
    var renderer = new server_1.ServerRenderer(history, router, paramorph);
    return renderer.render(locals);
};
var clientRender = function () {
    var history = history_1.createBrowserHistory();
    var renderer = new client_1.ClientRenderer(history, router, paramorph);
    renderer.render('root');
};
if (typeof window !== 'undefined') {
    if (document.readyState === 'complete') {
        clientRender();
    }
    else {
        window.addEventListener('load', clientRender);
    }
}
exports.default = serverRender;
if (module.hot) {
    module.hot.accept('./data', clientRender);
}
//# sourceMappingURL=entry.js.map