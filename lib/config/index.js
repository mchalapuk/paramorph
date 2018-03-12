"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var offensive_1 = require("offensive");
var js_yaml_1 = require("js-yaml");
var specialDirs_1 = require("./specialDirs");
function load(yaml) {
    var config = js_yaml_1.safeLoad(yaml);
    offensive_1.default(config.title, 'config.title').is.aString();
    offensive_1.default(config.timezone, 'config.timezone').is.aString();
    offensive_1.default(config.collections, 'config.collections').is.anObject();
    Object.keys(config.collections)
        .filter(function (key) {
        if (specialDirs_1.default.indexOf(key) === -1) {
            console.warn("couldn't find folder _" + key + " required by collection " + key);
            return false;
        }
        return true;
    })
        .forEach(function (key) {
        var collection = config.collections[key];
        offensive_1.default(collection.title, "config.collections[" + name + "].title").is.Undefined.or.aString();
        offensive_1.default(collection.layout, "config.collections[" + name + "].layout").is.Undefined.or.aString();
        offensive_1.default(collection.output, "config.collections[" + name + "].output").is.Undefined.or.aBoolean();
    });
    offensive_1.default(config.image, 'config.image').is.aString();
    offensive_1.default(config.baseUrl, 'config.baseUrl').is.aString();
    offensive_1.default(config.locale, 'pl_PL').is.aString();
    offensive_1.default(config.menu, 'config.menu').is.anArray();
    config.menu.forEach(function (entry, i) {
        offensive_1.default(entry, "config.menu[" + i + "].title").is.aString();
        offensive_1.default(entry, "config.menu[" + i + "].short").is.aString();
        offensive_1.default(entry, "config.menu[" + i + "].url").is.aString();
        offensive_1.default(entry, "config.menu[" + i + "].icon").is.aString();
    });
    return config;
}
exports.load = load;
