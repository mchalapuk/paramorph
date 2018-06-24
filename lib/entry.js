"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./renderers/server");
var client_1 = require("./renderers/client");
var Root_1 = require("./components/Root");
var route_factory_1 = require("./route-factory");
var paramorph = require('./config');
var routesFactory = new route_factory_1.default();
var routes = routesFactory.getRoutes(paramorph);
var serverRender = function (locals) {
    var renderer = new server_1.ServerRenderer(locals.Root || Root_1.default);
    return renderer.render(locals, paramorph, routes);
};
var clientRender = function () {
    var renderer = new client_1.ClientRenderer();
    renderer.render('root', paramorph, routes);
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