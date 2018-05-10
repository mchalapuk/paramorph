"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var config = require('./config');
function checkIsArray(value, name) {
    if (!(value instanceof Array)) {
        throw new Error(name + " must be an array; got " + typeof value);
    }
    return value;
}
function checkIsString(value, name) {
    if (typeof value != 'string') {
        throw new Error(name + " must be a string; got " + typeof value);
    }
    return value;
}
checkIsArray(config.menu, 'config.menu');
var isLocalUrl = function (url) { return url.charAt(0) == '/' && url.charAt(1) != '/'; };
function warnIfNotAPageOrCategory(url, requiredBy) {
    /**
      if (isLocalUrl(url) && website.pages[url] == undefined && website.categories[url] == undefined) {
        console.warn(`page of url \'${url}\' required by ${requiredBy} is not defined`);
      }
    **/
    return url;
}
var menu = config.menu.map(function (cfg, i) {
    return new models_1.MenuEntry(checkIsString(cfg.title, "menu[" + i + "].title"), checkIsString(cfg.short, "menu[" + i + "].short"), warnIfNotAPageOrCategory(checkIsString(cfg.url, "menu[" + i + "].url"), "menu entry '" + cfg.title + "'"), cfg.icon && checkIsString(cfg.icon, "menu[" + i + "].icon"));
});
exports.default = menu;
//# sourceMappingURL=menu.js.map