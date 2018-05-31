"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var FileSystem_1 = require("../platform/node/FileSystem");
var Loader_1 = require("./Loader");
var ProjectStructure_1 = require("./ProjectStructure");
var FrontMatter_1 = require("./FrontMatter");
var PageFactory_1 = require("./PageFactory");
var uneval_1 = require("./uneval");
module.exports = function configLoader(source, map, meta) {
    var that = this;
    var callback = that.async();
    var fs = new FileSystem_1.default();
    var loader = new Loader_1.default(new ProjectStructure_1.default(fs), new FrontMatter_1.default(fs), new PageFactory_1.default());
    loader.load(config_1.parse(source))
        .then(function (paramorph) {
        var source = uneval_1.default(paramorph, 'paramorph') + ';\nmodule.exports = paramorph;\n';
        callback(null, source, map, meta);
    })
        .catch(function (err) {
        callback(err);
    });
};
//# sourceMappingURL=index.js.map