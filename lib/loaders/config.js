"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var Paramorph_1 = require("../Paramorph");
module.exports = function configLoader(source) {
    return Paramorph_1.load(config_1.parse(source)).uneval('paramorph') + ';\nmodule.exports = paramorph;\n';
};
