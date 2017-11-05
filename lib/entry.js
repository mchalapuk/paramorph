"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var server_1 = require("react-dom/server");
var react_router_dom_1 = require("react-router-dom");
var react_hot_loader_1 = require("react-hot-loader");
var PropTypes = require("prop-types");
var Root_1 = require("./components/Root");
var IsomorphicStyleContext_1 = require("./components/IsomorphicStyleContext");
var routes_1 = require("./routes");
var data_1 = require("./data");
var css = new Set();
// context for catching css modules during static rendering
var CssCaptureContext = /** @class */ (function (_super) {
    __extends(CssCaptureContext, _super);
    function CssCaptureContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CssCaptureContext.prototype.getChildContext = function () {
        return {
            insertCss: function () {
                var styles = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    styles[_i] = arguments[_i];
                }
                styles.forEach(function (s) { return css.add(s._getCss()); });
            },
        };
    };
    CssCaptureContext.prototype.render = function () {
        return react_1.Children.only(this.props.children);
    };
    CssCaptureContext.childContextTypes = {
        insertCss: PropTypes.func.isRequired,
    };
    return CssCaptureContext;
}(react_1.Component));
var serverRender = function (locals) {
    // react root contents rendered with react ids
    var child = react_1.createElement(react_router_dom_1.Switch, {}, routes_1.default);
    var router = react_1.createElement(react_router_dom_1.StaticRouter, { location: locals.path, context: {} }, child);
    var context = react_1.createElement(CssCaptureContext, {}, router);
    var body = server_1.renderToString(context);
    // site skeleton rendered without react ids and with prerendered css modules
    var page = (data_1.default.entities[locals.path] || { tags: [], description: '' });
    var title = page.title + " | " + locals.title;
    var bundles = locals.scripts.map(function (name) { return "/" + locals.assets[name]; });
    var root = react_1.createElement(Root_1.default, Object.assign({ css: __spread(css) }, locals, page, { title: title, bundles: bundles }));
    var html = server_1.renderToStaticMarkup(root);
    // everything together
    return '<!DOCTYPE html>\n' + html.replace("%%%BODY%%%", body);
};
var clientRender = function () {
    var container = document.getElementById('root');
    var child = react_1.createElement(react_router_dom_1.Switch, {}, routes_1.default);
    var router = react_1.createElement(react_router_dom_1.BrowserRouter, {}, child);
    var context = react_1.createElement(IsomorphicStyleContext_1.default, { children: router });
    var app = react_1.createElement(react_hot_loader_1.AppContainer, {}, context);
    react_dom_1.render(app, container);
};
if (typeof window !== 'undefined') {
    window.addEventListener('load', clientRender);
}
exports.default = serverRender;
if (module.hot) {
    module.hot.accept('./routes', clientRender);
}
