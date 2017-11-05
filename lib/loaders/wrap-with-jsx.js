"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loader_utils_1 = require("loader-utils");
module.exports = function wrapWithJsxLoader(source) {
    var that = this;
    that.cacheable && that.cacheable();
    var opts = loader_utils_1.getOptions(that);
    var exports = that.exec(source, that.resource);
    var wrapped = opts.field ? exports[opts.field] : exports;
    if (typeof wrapped != 'string') {
        var variable = opts.field ? ('exports' + opts.field) : 'exports';
        throw new Error('wrapWithJsxloader expects ' + variable
            + ' property of type string; got ' + typeof wrapped
            + '\nopts=' + JSON.stringify(opts));
    }
    var limit = exports.frontMatter.limit || opts.limit || 5;
    var template = 'import React from \'react\';\n'
        + 'import ContentLimiter from \'paramorph/components/ContentLimiter\';'
        + 'export const component = (data) => (\n'
        + '  <ContentLimiter limit={ ' + limit + '} {...data}>%WRAPPED%</ContentLimiter>\n'
        + ');\n';
    var sources = template.replace('%WRAPPED%', wrapped)
        + Object.keys(exports).map(function (key) {
            return 'export const ' + key + ' = ' + JSON.stringify(exports[key]) + ';\n';
        }).join('');
    return sources;
};
