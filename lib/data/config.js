"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var js_yaml_1 = require("js-yaml");
var config = js_yaml_1.safeLoad(fs_1.readFileSync('./_config.yml', 'utf8'));
var code = "module.exports = " + JSON.stringify(config) + ";\n";
module.exports = function () {
    return { code: code };
};
