"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FakeFileSystem = /** @class */ (function () {
    function FakeFileSystem() {
        this.files = {};
        this.directories = [];
    }
    FakeFileSystem.prototype.readDir = function (path) {
        if (this.directories.indexOf(path) === -1) {
            return Promise.reject(new Error("no such file or directory: " + path));
        }
        var normalized = path.endsWith('/') ? path : path + "/";
        var contentFiles = Object.keys(this.files)
            .filter(function (f) { return f.match(new RegExp("^" + normalized + "[^/]+$")); });
        var contentDirs = this.directories
            .filter(function (d) { return d.match(new RegExp("^" + normalized + "[^/]+$")); });
        var result = contentFiles.concat(contentDirs)
            .map(function (p) { return p.substring(normalized.length); });
        return Promise.resolve(result);
    };
    FakeFileSystem.prototype.lstat = function (path) {
        if (this.directories.indexOf(path) !== -1) {
            return Promise.resolve({
                isDirectory: function () { return true; },
            });
        }
        if (this.files.hasOwnProperty(path)) {
            return Promise.resolve({
                isDirectory: function () { return false; },
            });
        }
        return Promise.reject(new Error("no such file or directory: " + path));
    };
    FakeFileSystem.prototype.writeFile = function (path, content) {
        this.files[path] = content;
    };
    FakeFileSystem.prototype.createDir = function (path) {
        this.directories.push(path);
    };
    return FakeFileSystem;
}());
exports.FakeFileSystem = FakeFileSystem;
exports.FileSystem = FakeFileSystem;
exports.default = FakeFileSystem;
