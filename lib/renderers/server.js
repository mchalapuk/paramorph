"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var server_1 = require("react-dom/server");
var ServerRenderer = /** @class */ (function () {
    function ServerRenderer(Root) {
        this.Root = Root;
    }
    ServerRenderer.prototype.render = function (locals, routes) {
        var _this = this;
        var routeSwitch = react_1.createElement(react_router_dom_1.Switch, {}, routes.map(function (r) { return r.route; }));
        return routes.reduce(function (result, _a) {
            var page = _a.page, route = _a.route;
            // react root contents rendered with react ids
            var router = react_1.createElement(react_router_dom_1.StaticRouter, getRouterProps(page.url), routeSwitch);
            var body = server_1.renderToString(router);
            // site skeleton rendered without react ids
            var root = react_1.createElement(_this.Root, getRootProps(locals, page));
            var html = server_1.renderToStaticMarkup(root);
            result[page.url] = '<!DOCTYPE html>\n' + html.replace("%%%BODY%%%", body);
            return result;
        }, {});
    };
    return ServerRenderer;
}());
exports.ServerRenderer = ServerRenderer;
exports.default = ServerRenderer;
function getRouterProps(location) {
    return { location: location, context: {} };
}
function getRootProps(locals, page) {
    var title = page.title + (locals.title ? " | " + locals.title : '');
    var assets = Object.keys(locals.webpackStats.compilation.assets)
        .map(function (url) { return "/" + url; });
    var css = assets.filter(function (value) { return value.match(/\.css$/); });
    var js = assets.filter(function (value) { return value.match(/\.js$/); });
    return {
        page: Object.assign(page, { title: title }),
        localBundles: { css: css, js: js },
        externalBundles: { css: locals.css || [], js: locals.js || [] },
    };
}
