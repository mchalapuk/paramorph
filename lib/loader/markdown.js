"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loader_utils_1 = require("loader-utils");
var Markdown = require('markdown-it');
var readFileSync = require('fs').readFileSync;
var path = require('path');
var template = loadTemplate();
var DELIMITER = '---\n';
var MAX_FM_SIZE = 2048;
module.exports = function markdownLoader(source) {
    var that = this;
    that.cacheable && that.cacheable();
    var opts = loader_utils_1.getOptions(that) || {};
    var md = newMarkdown(opts);
    var markdownSource = removeFrontMatter(that.resourcePath, source);
    var html = md.render(markdownSource)
        .replace('&lt;', '<')
        .replace('&gt;', '>')
        .replace('…', '...');
    return template.replace('{ this.props.children }', html);
};
function newMarkdown(opts) {
    var md = new Markdown(opts);
    var plugins = opts.plugins = [];
    for (var i = 0; i < plugins.length; ++i) {
        md = md.use(plugins[i]);
    }
    return md;
}
function removeFrontMatter(path, source) {
    if (source.substring(0, 4) !== DELIMITER) {
        throw new Error("Couldn't find front matter data at the beginning of " + path + "; expected '---\\n'; got '" + source.substring(0, 4) + "'.");
    }
    var end = source.indexOf("\n" + DELIMITER, 4);
    if (end === -1) {
        throw new Error("Couldn't find end of front matter data in first " + MAX_FM_SIZE + " bytes of " + path + ".");
    }
    return source.substring(end + 4);
}
function loadTemplate() {
    return readFileSync(path.join(__dirname, './MarkdownPage.js')).toString('utf8');
}
//# sourceMappingURL=markdown.js.map