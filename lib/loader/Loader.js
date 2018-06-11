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
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("../model");
var Loader = /** @class */ (function () {
    function Loader(structure, frontMatter, pageFactory) {
        this.structure = structure;
        this.frontMatter = frontMatter;
        this.pageFactory = pageFactory;
    }
    Loader.prototype.load = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var paramorph, specialDirs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paramorph = new model_1.Paramorph(config);
                        return [4 /*yield*/, this.structure.scan(config)];
                    case 1:
                        specialDirs = _a.sent();
                        specialDirs.layouts.forEach(function (file) { return paramorph.addLayout(new model_1.Layout(file.name, file.path)); });
                        specialDirs.includes.forEach(function (file) { return paramorph.addInclude(new model_1.Include(file.name, file.path)); });
                        // TODO queue + limited number of workers?
                        return [4 /*yield*/, Promise.all(Object.keys(specialDirs.collections)
                                .map(function (collection) {
                                var sourceFiles = specialDirs.collections[collection];
                                return Promise.all(sourceFiles.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                                    var matter, page;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.frontMatter.read(file)];
                                            case 1:
                                                matter = _a.sent();
                                                page = this.pageFactory.create(file, collection, matter);
                                                paramorph.addPage(page);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }));
                            }))];
                    case 2:
                        // TODO queue + limited number of workers?
                        _a.sent();
                        return [2 /*return*/, paramorph];
                }
            });
        });
    };
    return Loader;
}());
exports.Loader = Loader;
exports.default = Loader;
//# sourceMappingURL=Loader.js.map