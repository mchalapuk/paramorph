"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
function uneval(paramorph, varName) {
    if (varName === void 0) { varName = 'paramorph'; }
    return "const " + varName + " = new Paramorph(" + JSON.stringify(paramorph.config) + ");\n"
        + Object.keys(paramorph.layouts)
            .map(function (key) { return paramorph.layouts[key]; })
            .map(function (layout) { return varName + ".addLayout(" + unevalLayout(layout) + ");\n"; })
            .join('')
        + Object.keys(paramorph.includes)
            .map(function (key) { return paramorph.includes[key]; })
            .map(function (include) { return varName + ".addInclude(" + unevalInclude(include) + ");\n"; })
            .join('')
        + Object.keys(paramorph.pages)
            .map(function (key) { return paramorph.pages[key]; })
            .map(function (page) { return varName + ".addPage(" + unevalPage(page) + ");\n"; })
            .join('');
}
exports.uneval = uneval;
exports.default = uneval;
function unevalLayout(layout) {
    return "new Layout(" + JSON.stringify(layout.name) + ", " + JSON.stringify(layout.path) + ")";
}
exports.unevalLayout = unevalLayout;
function unevalInclude(include) {
    return "new Include(" + JSON.stringify(include.name) + ", " + JSON.stringify(include.path) + ")";
}
exports.unevalInclude = unevalInclude;
function unevalPage(page) {
    if (page instanceof __1.Tag) {
        return "new Tag(" + JSON.stringify(page.originalTitle) + ", " + JSON.stringify(page.description) + ", " + JSON.stringify(page.image) + ", " + JSON.stringify(page.layout) + ", " + JSON.stringify(page.source) + ", " + JSON.stringify(page.output) + ", " + JSON.stringify(page.timestamp) + ")";
    }
    var Type = page instanceof __1.Category ? 'Category' : 'Page';
    return "new " + Type + "(" + JSON.stringify(page.url) + ", " + JSON.stringify(page.title) + ", " + JSON.stringify(page.description) + ", " + JSON.stringify(page.image) + ", " + JSON.stringify(page.collection) + ", " + JSON.stringify(page.layout) + ", " + JSON.stringify(page.source) + ", " + JSON.stringify(page.output) + ", " + JSON.stringify(page.feed) + ", " + JSON.stringify(page.categories) + ", " + JSON.stringify(page.tags) + ", " + JSON.stringify(page.timestamp) + ")";
}
exports.unevalPage = unevalPage;
//# sourceMappingURL=uneval.js.map