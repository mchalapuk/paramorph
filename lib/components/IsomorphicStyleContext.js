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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var PropTypes = require("prop-types");
var IsomorphicStyleContext = /** @class */ (function (_super) {
    __extends(IsomorphicStyleContext, _super);
    function IsomorphicStyleContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IsomorphicStyleContext.prototype.getChildContext = function () {
        return {
            insertCss: function () {
                var styles = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    styles[_i] = arguments[_i];
                }
                var removeCss = styles.map(function (x) { return x._insertCss(); });
                return function () { removeCss.forEach(function (f) { return f(); }); };
            },
        };
    };
    IsomorphicStyleContext.prototype.render = function () {
        return react_1.Children.only(this.props.children);
    };
    IsomorphicStyleContext.childContextTypes = {
        insertCss: PropTypes.func.isRequired,
    };
    return IsomorphicStyleContext;
}(react_1.Component));
exports.IsomorphicStyleContext = IsomorphicStyleContext;
exports.default = IsomorphicStyleContext;
