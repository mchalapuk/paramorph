"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_hot_loader_1 = require("react-hot-loader");
var ContextTypes_1 = require("./ContextTypes");
var ContextContainer = /** @class */ (function (_super) {
    __extends(ContextContainer, _super);
    function ContextContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContextContainer.prototype.getChildContext = function () {
        var _a = this.props, paramorph = _a.paramorph, page = _a.page, history = _a.history;
        return { paramorph: paramorph, page: page, history: history };
    };
    ContextContainer.prototype.render = function () {
        return (React.createElement(react_hot_loader_1.AppContainer, null, React.Children.only(this.props.children)));
    };
    ContextContainer.childContextTypes = ContextTypes_1.ContextTypes;
    return ContextContainer;
}(React.Component));
exports.ContextContainer = ContextContainer;
exports.default = ContextContainer;
//# sourceMappingURL=ContextContainer.js.map