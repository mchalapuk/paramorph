"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function uneval(paramorph, varName) {
    if (varName === void 0) { varName = 'paramorph'; }
    return "const " + varName + " = new Paramorph(" + JSON.stringify(paramorph.config) + ");\n"
        + Object.keys(paramorph.pages)
            .map(function (url) { return varName + ".addPage(\"" + url + "\", " + unevalPage(paramorph.pages[url]) + ");\n"; })
            .join('');
}
exports.uneval = uneval;
exports.default = uneval;
function unevalPage(page) {
    return "new Page(" + JSON.stringify(page.url) + ", " + JSON.stringify(page.title) + ", " + JSON.stringify(page.description) + ", " + JSON.stringify(page.image) + ", " + JSON.stringify(page.layout) + ", " + JSON.stringify(page.source) + ", " + JSON.stringify(page.output) + ", " + JSON.stringify(page.feed) + ", " + JSON.stringify(page.categories) + ", " + JSON.stringify(page.tags) + ", " + JSON.stringify(page.timestamp) + ")";
}
exports.unevalPage = unevalPage;
