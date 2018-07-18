"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var NOT_FOUND_URL = '/404';
var RoutesFactory = /** @class */ (function () {
    function RoutesFactory() {
    }
    RoutesFactory.prototype.getRoutes = function (paramorph) {
        var error404 = paramorph.pages[NOT_FOUND_URL];
        if (error404 === undefined) {
            throw new Error("couldn't find page of url " + NOT_FOUND_URL);
        }
        function createRoute(page, path) {
            var _this = this;
            if (path === void 0) { path = page.url; }
            return {
                path: path,
                action: function () { return __awaiter(_this, void 0, void 0, function () {
                    var layout, layoutExports, pageExports, LayoutComponent, PageComponent;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                layout = paramorph.layouts[page.layout];
                                return [4 /*yield*/, paramorph.loadLayout(page.layout)];
                            case 1:
                                layoutExports = _a.sent();
                                return [4 /*yield*/, paramorph.loadPage(page.url)];
                            case 2:
                                pageExports = _a.sent();
                                LayoutComponent = validateDefaultReactExport(layoutExports, layout.path);
                                PageComponent = validateDefaultReactExport(pageExports, page.source);
                                return [2 /*return*/, (React.createElement(LayoutComponent, null,
                                        React.createElement(PageComponent, null)))];
                        }
                    });
                }); },
            };
        }
        var routes = Object.keys(paramorph.pages)
            .map(function (url) { return paramorph.pages[url]; })
            .filter(function (page) { return page.output; })
            .map(function (page) { return createRoute(page); });
        // 404 (must be at the end)
        routes.push(createRoute(error404, '/:anything'));
        return routes;
    };
    return RoutesFactory;
}());
exports.RoutesFactory = RoutesFactory;
;
exports.default = RoutesFactory;
function validateDefaultReactExport(exports, url) {
    if (exports.default === undefined) {
        throw new Error(url + " must have a default export");
    }
    var candidate = exports.default;
    if (React.isValidElement(candidate) && typeof candidate.type === 'function') {
        var got = JSON.stringify(candidate);
        throw new Error(url + " must have react component as default export; got " + got);
    }
    return exports.default;
}
//# sourceMappingURL=route-factory.js.map