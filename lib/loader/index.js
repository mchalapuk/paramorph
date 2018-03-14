"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var load_1 = require("./load");
var uneval_1 = require("./uneval");
module.exports = function configLoader(source) {
    return uneval_1.default(load_1.default(config_1.parse(source)), 'paramorph') + ';\nmodule.exports = paramorph;\n';
};
