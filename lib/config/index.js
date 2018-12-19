"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var js_yaml_1 = require("js-yaml");
require("offensive/assertions/aString/register");
require("offensive/assertions/aBoolean/register");
require("offensive/assertions/anArray/register");
require("offensive/assertions/Undefined/register");
require("offensive/assertions/Empty/register");
require("offensive/assertions/allElementsThat/register");
require("offensive/assertions/fieldThat/register");
require("offensive/assertions/allFieldsThat/register");
var offensive_1 = require("offensive");
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
    offensive_1.default(config, 'config')
        .has.fieldThat('title', function (title) { return title.is.aString; })
        .and.fieldThat('timezone', function (timezone) { return timezone.is.aString; })
        .and.fieldThat('collections', function (collections) { return collections
        .is.anObject
        .and.has.allFieldsThat(function (collection) { return collection
        .has.fieldThat('title', function (title) { return title.is.Undefined.or.aString; })
        .and.fieldThat('layout', function (layout) { return layout.is.Undefined.or.aString; })
        .and.fieldThat('output', function (output) { return output.is.Undefined.or.aBoolean; }); }); })
        .and.fieldThat('image', function (image) { return image.is.Empty.or.aString; })
        .and.fieldThat('baseUrl', function (baseUrl) { return baseUrl.is.aString; })
        .and.fieldThat('locale', function (locale) { return locale.is.aString; })
        .and.fieldThat('menu', function (menu) { return menu
        .is.anArray
        .and.has.allElementsThat(function (elem) { return elem
        .has.fieldThat('title', function (title) { return title.is.aString; })
        .and.fieldThat('short', function (short) { return short.is.aString; })
        .and.fieldThat('url', function (url) { return url.is.aString; })
        .and.fieldThat('icon', function (icon) { return icon.is.Empty.or.aString; }); }); })();
    return config;
}
exports.parse = parse;
//# sourceMappingURL=index.js.map