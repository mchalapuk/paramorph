"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var NOT_FOUND_URL = '/404';
var RoutesFactory = /** @class */ (function () {
    function RoutesFactory() {
    }
    RoutesFactory.prototype.getRoutes = function (website) {
        var error404 = website.pages[NOT_FOUND_URL];
        if (error404 === undefined) {
            throw new Error("couldn't find page of url " + NOT_FOUND_URL);
        }
        function createRoute(page, path, exact) {
            if (path === void 0) { path = page.url; }
            if (exact === void 0) { exact = true; }
            var component = function () { return react_1.createElement(page.layout.component, { website: website, page: page }); };
            var routeProps = { page: page, path: path, exact: exact, key: path, component: component };
            var route = react_1.createElement(react_router_dom_1.Route, routeProps);
            return { page: page, route: route };
        }
        var routes = [].concat.call(
        // categories
        Object.keys(website.categories)
            .map(function (title) { return website.categories[title]; })
            .filter(function (category) { return category.output; })
            .map(function (category) { return createRoute(category); }), 
        // tags
        Object.keys(website.tags)
            .map(function (title) { return createRoute(website.tags[title]); }), 
        // pages
        Object.keys(website.pages)
            .map(function (title) { return website.pages[title]; })
            .filter(function (page) { return page.output; })
            .map(function (page) { return createRoute(page); }), 
        // 404 with exact = false (must be at the end)
        [
            createRoute(error404, '/', false),
        ]);
        return routes;
    };
    return RoutesFactory;
}());
exports.RoutesFactory = RoutesFactory;
;
exports.default = RoutesFactory;
