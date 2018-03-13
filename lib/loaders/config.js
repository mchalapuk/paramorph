"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
module.exports = function configLoader(source) {
    return 'module.exports = ' + JSON.stringify(config_1.parse(source)) + ';';
};
