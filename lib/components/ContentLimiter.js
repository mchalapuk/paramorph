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
    limitContent(children, limit, props, 'root', output);
    return React.createElement("div", { className: 'content' }, output);
}
exports.ContentLimiter = ContentLimiter;
exports.default = ContentLimiter;
function limitContent(node, limit, limiterProps, key, output) {
    if (limit === 0 || node === null || node === undefined) {
        return limit;
    }
    switch (typeof node) {
        case 'boolean':
        case 'number':
            output.push(node);
            return limit;
        case 'string':
            return limitString(node, limit, output);
        default:
            return limitReactElement(node, limit, limiterProps, key, output);
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
function limitReactElement(elem, limit, limiterProps, key, output) {
    if (elem.type === 'img') {
        return limit;
    }
    var newChildren = [];
    var characters = limit;
    react_1.Children.forEach(elem.props.children, function (child, key) {
        characters = limitContent(child, characters, limiterProps, key, newChildren);
    });
    var cloneProps = createCloneProps(elem, limiterProps, key);
    output.push(react_1.cloneElement(elem, cloneProps, newChildren.length === 0 ? undefined : newChildren));
    return characters;
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
function createCloneProps(elem, limiterProps, key) {
    if (typeof elem.type === 'string') {
        return __assign({ key: key }, elem.props);
    }
    return __assign({ key: key }, elem.props, limiterProps);
}
