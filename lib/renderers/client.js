"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var react_2 = require("../react");
var ClientRenderer = /** @class */ (function () {
    function ClientRenderer(history, router, paramorph) {
        this.history = history;
        this.router = router;
        this.paramorph = paramorph;
    }
    ClientRenderer.prototype.render = function (containerId) {
        var _this = this;
        var container = document.getElementById(containerId);
        var _a = this, history = _a.history, paramorph = _a.paramorph;
        var resolve = function (page) {
            _this.router.resolve(page.url)
                .then(function (Component) {
                var component = react_1.createElement(Component, {});
                var props = { history: history, paramorph: paramorph, page: page };
                var app = react_1.createElement(react_2.ContextContainer, props, component);
                react_dom_1.render(app, container);
            });
        };
        var pages = this.paramorph.pages;
        var notFound = pages['/404'];
        var unlisten = this.history.listen(function (location) { return resolve(pages[location.pathname] || notFound); });
        window.addEventListener('unload', unlisten);
        var initialPage = pages[this.history.location.pathname] || notFound;
        resolve(initialPage);
    };
    return ClientRenderer;
}());
exports.ClientRenderer = ClientRenderer;
exports.default = ClientRenderer;
//# sourceMappingURL=client.js.map