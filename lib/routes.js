"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var data_1 = require("./data");
var NOT_FOUND_URL = '/404';
var error404 = data_1.default.pages[NOT_FOUND_URL];
if (error404 == undefined) {
    throw new Error("couldn't find page of url " + NOT_FOUND_URL);
}
var key = 0;
function createRoute(page, path, exact) {
    if (path === void 0) { path = page.url; }
    if (exact === void 0) { exact = true; }
    var component = function () { return react_1.createElement(page.layout.component, { website: data_1.default, page: page }); };
    var routeProps = { path: path, exact: exact, key: key++, component: component };
    var route = react_1.createElement(react_router_dom_1.Route, routeProps);
    return route;
}
var routes = [].concat.call(
// categories
Object.keys(data_1.default.categories)
    .map(function (title) { return data_1.default.categories[title]; })
    .filter(function (category) { return category.output; })
    .map(function (category) { return createRoute(category); }), 
// tags
Object.keys(data_1.default.tags)
    .map(function (title) { return createRoute(data_1.default.tags[title]); }), 
// pages
Object.keys(data_1.default.pages)
    .map(function (title) { return data_1.default.pages[title]; })
    .filter(function (page) { return page.output; })
    .map(function (page) { return createRoute(page); }), 
// 404 with exact = false (must be at the end)
[
    createRoute(error404, '/', false),
]);
exports.default = routes;
//# sourceMappingURL=routes.js.map