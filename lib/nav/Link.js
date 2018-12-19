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
var react_1 = require("../react");
var noop = function () { };
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    function Link() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Link.prototype.render = function () {
        var _a = this.props, to = _a.to, children = _a.children, _b = _a.onClick, onClick = _b === void 0 ? noop : _b;
        return (React.createElement("a", { onClick: this.wrap(onClick), href: to }, children));
    };
    Link.prototype.wrap = function (onClick) {
        var _this = this;
        return function (event) {
            var result = onClick(event);
            if (result === false) {
                event.preventDefault();
                return false;
            }
            if (_this.isLocal()) {
                var history_1 = _this.context.history;
                var to = _this.props.to;
                history_1.push(to);
                event.preventDefault();
                return false;
            }
            // default anchor behavior
            return true;
        };
    };
    Link.prototype.isLocal = function () {
        // if it doesn't start with something:// then its local
        return !this.props.to.match(/^[a-z]*\:\/\/.*$/i);
    };
    return Link;
}(react_1.PureComponent));
exports.Link = Link;
exports.default = Link;
//# sourceMappingURL=Link.js.map