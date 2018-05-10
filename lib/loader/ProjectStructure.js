"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LAYOUTS_DIR = '_layouts';
var INCLUDES_DIR = '_includes';
var ROOT_DIR = '.';
var JS_REGEX = /\.(t|j)sx?$/;
var MD_REGEX = /\.markdown$/;
var FORBIDDEN_NAMES = [
    'layouts',
    'includes',
    'ROOT',
];
var ProjectStructure = /** @class */ (function () {
    function ProjectStructure(fs) {
        this.fs = fs;
    }
    ProjectStructure.prototype.scan = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var collectionNames, specialDirs, underscoredFolders, requiredFolders, i, collectionFolders, _loop_1, this_1, i, state_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collectionNames = Object.keys(config.collections);
                        collectionNames.forEach(function (name) {
                            if (FORBIDDEN_NAMES.indexOf(name) !== -1) {
                                throw new Error("collection name forbidden: '" + name + "'");
                            }
                        });
                        specialDirs = {
                            layouts: [],
                            includes: [],
                            collections: {},
                        };
                        return [4 /*yield*/, this.fs.readDir('.')];
                    case 1:
                        underscoredFolders = (_a.sent())
                            .filter(function (path) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.fs.lstat("./" + path)];
                                case 1: return [2 /*return*/, (_a.sent()).isDirectory()];
                            }
                        }); }); })
                            .filter(function (path) { return path.match(/^_[a-z0-9-_]+$/); });
                        requiredFolders = [LAYOUTS_DIR, INCLUDES_DIR];
                        for (i = 0; i < requiredFolders.length; ++i) {
                            if (underscoredFolders.indexOf(requiredFolders[i]) === -1) {
                                throw new Error("couldn't find ./" + requiredFolders[i] + " folder");
                            }
                        }
                        collectionFolders = underscoredFolders
                            .filter(function (folder) { return requiredFolders.indexOf(folder) === -1; });
                        return [4 /*yield*/, this.scanDir("./" + LAYOUTS_DIR, JS_REGEX)
                                .then(function (sourceFiles) { return specialDirs.layouts = sourceFiles; })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.scanDir("./" + INCLUDES_DIR, JS_REGEX)
                                .then(function (sourceFiles) { return specialDirs.includes = sourceFiles; })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.scanDir(ROOT_DIR, MD_REGEX, false)
                                .then(function (sourceFiles) { return specialDirs.collections['ROOT'] = sourceFiles; })];
                    case 4:
                        _a.sent();
                        _loop_1 = function (i) {
                            var name_1, folder;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        name_1 = collectionNames[i];
                                        folder = "_" + name_1;
                                        if (underscoredFolders.indexOf(folder) === -1) {
                                            console.warn("couldn't find folder " + folder + " required by collection " + name_1);
                                            return [2 /*return*/, "break"];
                                        }
                                        return [4 /*yield*/, this_1.scanDir("./" + folder, MD_REGEX)
                                                .then(function (sourceFiles) { return specialDirs.collections[name_1] = sourceFiles; })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 5;
                    case 5:
                        if (!(i < collectionNames.length)) return [3 /*break*/, 8];
                        return [5 /*yield**/, _loop_1(i)];
                    case 6:
                        state_1 = _a.sent();
                        if (state_1 === "break")
                            return [3 /*break*/, 8];
                        _a.label = 7;
                    case 7:
                        ++i;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/, specialDirs];
                }
            });
        });
    };
    ProjectStructure.prototype.scanDir = function (path, fileRegex, subdirs) {
        if (subdirs === void 0) { subdirs = true; }
        return __awaiter(this, void 0, void 0, function () {
            var result, rawContents, rawContents_1, rawContents_1_1, name_2, subPath, stat, subContents, subName, subSubPath, subStat, e_1_1, e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = [];
                        return [4 /*yield*/, this.fs.readDir(path)];
                    case 1:
                        rawContents = (_b.sent()).sort();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 10, 11, 12]);
                        rawContents_1 = __values(rawContents), rawContents_1_1 = rawContents_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!rawContents_1_1.done) return [3 /*break*/, 9];
                        name_2 = rawContents_1_1.value;
                        subPath = path + "/" + name_2;
                        return [4 /*yield*/, this.fs.lstat(subPath)];
                    case 4:
                        stat = _b.sent();
                        if (!(subdirs && stat.isDirectory())) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.fs.readDir(subPath)];
                    case 5:
                        subContents = (_b.sent())
                            .filter(function (subName) { return subName.match(fileRegex); })
                            .filter(function (subName) { return subName.startsWith('index.') && !subName.substring(6).match(fileRegex); })
                            .sort();
                        if (subContents.length === 0) {
                            return [3 /*break*/, 8];
                        }
                        if (subContents.length > 1) {
                            throw new Error("multiple index files found in subfolder: " + subPath + ": " + subContents);
                        }
                        subName = subContents[0];
                        subSubPath = subPath + "/" + subName;
                        return [4 /*yield*/, this.fs.lstat(subSubPath)];
                    case 6:
                        subStat = _b.sent();
                        if (!subStat.isDirectory()) {
                            result.push({ name: name_2, path: subSubPath });
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        if (name_2.match(fileRegex)) {
                            result.push({ name: removeExtension(name_2), path: subPath });
                        }
                        _b.label = 8;
                    case 8:
                        rawContents_1_1 = rawContents_1.next();
                        return [3 /*break*/, 3];
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 11:
                        try {
                            if (rawContents_1_1 && !rawContents_1_1.done && (_a = rawContents_1.return)) _a.call(rawContents_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, Promise.resolve(result)];
                }
            });
        });
    };
    return ProjectStructure;
}());
exports.ProjectStructure = ProjectStructure;
exports.default = ProjectStructure;
function removeExtension(name) {
    var dotIndex = name.indexOf('.');
    return dotIndex !== -1 ? name.substring(0, dotIndex) : name;
}
//# sourceMappingURL=ProjectStructure.js.map