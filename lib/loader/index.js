"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var load_1 = require("./load");
var uneval_1 = require("./uneval");
module.exports = function configLoader(source, map, meta) {
    var loader = this;
    var callback = loader.async();
    load_1.default(config_1.parse(source))
        .then(function (paramorph) {
        var source = uneval_1.default(paramorph, 'paramorph') + ';\nmodule.exports = paramorph;\n';
        callback(null, source, map, meta);
    })
        .catch(function (err) {
        callback(err);
    });
};
