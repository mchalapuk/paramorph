"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var offensive_1 = require("offensive");
var js_yaml_1 = require("js-yaml");
/**
 * Parses _config.yml, validates its content and returns as instance of Config.
 *
 * @author Maciej Chałapuk
 */
function parse(yaml) {
    var config = js_yaml_1.safeLoad(yaml);
    if (config === undefined) {
        throw new Error('Couldn\'t parse config file; is it empty?');
    }
    offensive_1.default(config.title, 'config.title').is.aString();
    offensive_1.default(config.timezone, 'config.timezone').is.aString();
    offensive_1.default(config.collections, 'config.collections').is.anObject();
    Object.keys(config.collections)
        .forEach(function (key) {
        var collection = config.collections[key];
        offensive_1.default(collection.title, "config.collections[" + name + "].title").is.either.Undefined.or.aString();
        offensive_1.default(collection.layout, "config.collections[" + name + "].layout").is.either.Undefined.or.aString();
        offensive_1.default(collection.output, "config.collections[" + name + "].output").is.either.Undefined.or.aBoolean();
    });
    offensive_1.default(config.image, 'config.image').is.either.Undefined.or.aString();
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
exports.parse = parse;
