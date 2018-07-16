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
        return (React.createElement("a", { onClick: wrap(onClick), href: to }, children));
    };
    return Link;
}(react_1.PureComponent));
exports.Link = Link;
exports.default = Link;
function wrap(onClick) {
    return function (event) {
        var result = onClick(event);
        return result !== undefined ? result : true;
    };
}
//# sourceMappingURL=Link.js.map