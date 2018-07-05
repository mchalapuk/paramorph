"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var server_1 = require("react-dom/server");
var LoaderRenderer = /** @class */ (function () {
    function LoaderRenderer(history, paramorph) {
        this.history = history;
        this.paramorph = paramorph;
    }
    LoaderRenderer.prototype.render = function (page) {
        var props = {
            history: this.history,
            paramorph: this.paramorph,
            page: page,
            respectLimit: false,
        };
        var component = require("@website" + page.source.substring(1)).default;
        var element = react_1.createElement(component, props);
        return server_1.renderToStaticMarkup(element);
    };
    return LoaderRenderer;
}());
exports.LoaderRenderer = LoaderRenderer;
exports.default = LoaderRenderer;
//# sourceMappingURL=loader.js.map