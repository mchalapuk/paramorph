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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var Content = /** @class */ (function (_super) {
    __extends(Content, _super);
    function Content() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Content.prototype.render = function () {
        this.outstandingLimit = this.props.limit || Number.MAX_SAFE_INTEGER;
        var children = this.props.children;
        return (React.createElement("div", { className: 'content' }, this.renderChildren(children)));
    };
    Content.prototype.renderChildren = function (children) {
        return react_1.Children.map(children, this.renderNode.bind(this));
    };
    Content.prototype.renderNode = function (node, key) {
        if (this.isLimitReached() || isEmpty(node)) {
            return null;
        }
        switch (typeof node) {
            case 'boolean':
            case 'number':
                return node;
            case 'string':
                return this.renderString(node);
            default:
                return this.renderComponent(node, key);
        }
    };
    Content.prototype.renderString = function (child) {
        if (child.indexOf('.') === -1) {
            return child;
        }
        var sentences = sentencize(child);
        var outstandingLimit = this.outstandingLimit;
        this.outstandingLimit -= sentences.length;
        return sentences.slice(0, outstandingLimit);
    };
    Content.prototype.renderComponent = function (elem, key) {
        var _a = this.props, respectLimit = _a.respectLimit, props = __rest(_a, ["respectLimit"]);
        if (respectLimit && elem.type === 'img') {
            return null;
        }
        var children = this.renderChildren(elem.props.children);
        return react_1.cloneElement(elem, cloneProps(elem, props, key), children.length === 0 ? undefined : children);
    };
    Content.prototype.isLimitReached = function () {
        var respectLimit = this.props.respectLimit;
        return respectLimit && this.outstandingLimit <= 0;
    };
    return Content;
}(react_1.Component));
exports.Content = Content;
exports.default = Content;
function isEmpty(node) {
    return node === null || node === undefined;
}
function sentencize(child) {
    var sentenceRegexp = /[^.!?…]*[.!?…]/g;
    var matches = [];
    var match;
    while ((match = sentenceRegexp.exec(child)) !== null) {
        matches.push(match[0]);
    }
    return matches;
}
function cloneProps(elem, limiterProps, key) {
    if (typeof elem.type === 'string') {
        return __assign({ key: key }, elem.props);
    }
    return __assign({ key: key }, elem.props, limiterProps);
}
