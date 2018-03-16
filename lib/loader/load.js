"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("../model");
function load(config) {
    var paramorph = new model_1.Paramorph(config);
    return Promise.resolve(paramorph);
}
exports.load = load;
exports.default = load;
