"use strict";
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
function ContentLimiter(_a) {
    var children = _a.children, limit = _a.limit, respectLimit = _a.respectLimit, props = __rest(_a, ["children", "limit", "respectLimit"]);
    if (!limit || !respectLimit) {
        return React.createElement("div", { className: 'content' }, children);
    }
    var output = [];
    limitContent(children, limit, props, output);
    return React.createElement("div", { className: 'content' }, output);
}
exports.ContentLimiter = ContentLimiter;
exports.default = ContentLimiter;
function limitContent(children, limit, props, output) {
    switch (typeof children) {
        case 'undefined':
            return limit;
        case 'number':
            output.push(children);
            return limit;
        case 'string':
            return limitString(children, limit, output);
        default:
            return limitReactElement(children, limit, props, output);
    }
}
function limitString(child, limit, output) {
    var previuos = 0;
    var current;
    var sentences = sentencize(child);
    if (sentences.length < limit) {
        output.push(child);
        return limit - sentences.length;
    }
    sentences.slice(0, limit)
        .forEach(function (sentence) { return output.push(sentence); });
    return 0;
}
function limitReactElement(children, limit, props, output) {
    var characters = limit;
    asReactElementArray(children).forEach(function (child, key) {
        if (characters === 0) {
            return;
        }
        var newChildren = [];
        characters = limitContent(child.props.children, characters, props, newChildren);
        var newProps = typeof child.type === 'object' ? __assign({}, props, { key: key }) : { key: key };
        output.push(react_1.cloneElement(child, newProps, newChildren.length === 0 ? undefined : newChildren));
    });
    return characters;
}
function asReactElementArray(children) {
    if (children === undefined) {
        return [];
    }
    if (typeof children !== 'object') {
        throw new Error("unexpected value: " + children);
    }
    return [].concat(children);
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
