"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("../model");
var FileSystem_1 = require("../platform/node/FileSystem");
var ProjectStructure_1 = require("./ProjectStructure");
var fs = new FileSystem_1.FileSystem();
function load(config) {
    var paramorph = new model_1.Paramorph(config);
    var structure = new ProjectStructure_1.ProjectStructure(fs);
    return structure.scan(config)
        .then(function (specialDirs) {
        console.log(specialDirs);
        return paramorph;
    });
}
exports.load = load;
exports.default = load;
