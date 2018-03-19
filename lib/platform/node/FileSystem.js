"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var fs_1 = require("fs");
var asyncReadDir = util_1.promisify(fs_1.readdir);
var asyncLstat = util_1.promisify(fs_1.lstat);
var NodeFileSystem = /** @class */ (function () {
    function NodeFileSystem() {
    }
    NodeFileSystem.prototype.readDir = function (path) {
        return asyncReadDir(path);
    };
    NodeFileSystem.prototype.lstat = function (path) {
        return asyncLstat(path);
    };
    return NodeFileSystem;
}());
exports.NodeFileSystem = NodeFileSystem;
exports.FileSystem = NodeFileSystem;
exports.default = NodeFileSystem;
