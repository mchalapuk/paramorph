"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loader_utils_1 = require("loader-utils");
var Markdown = require('markdown-it');
module.exports = function markdownLoader(source) {
    var that = this;
    that.cacheable && that.cacheable();
    var opts = loader_utils_1.getOptions(that);
    var md = new Markdown(opts);
    var plugins = opts.plugins = [];
    for (var i = 0; i < plugins.length; ++i) {
        md = md.use(plugins[i]);
    }
    var exports = that.exec(source, that.resource);
    if (typeof exports.body != 'string') {
        throw new Error('markdownloader expects body property of type string; got '
            + typeof exports.body);
    }
    var body = md.render(exports.body)
        .replace('&lt;', '<')
        .replace('&gt;', '>')
        .replace('…', '...');
    return 'module.exports = ' + JSON.stringify({
        frontMatter: exports.attributes,
        body: body,
        raw: exports.body
    });
};
