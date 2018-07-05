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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var history_1 = require("history");
var model_1 = require("../model");
var renderers_1 = require("../renderers");
var utils_1 = require("../utils");
var TagFactory_1 = require("./TagFactory");
var TAG_PAGE_URL = '/tag';
var Loader = /** @class */ (function () {
    function Loader(structure, frontMatter, pageFactory) {
        this.structure = structure;
        this.frontMatter = frontMatter;
        this.pageFactory = pageFactory;
    }
    Loader.prototype.load = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var paramorph, specialDirs, collectionFileTuples;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paramorph = new model_1.Paramorph(config);
                        return [4 /*yield*/, this.structure.scan(config)];
                    case 1:
                        specialDirs = _a.sent();
                        specialDirs.layouts.forEach(function (file) { return paramorph.addLayout(new model_1.Layout(file.name, file.path)); });
                        specialDirs.includes.forEach(function (file) { return paramorph.addInclude(new model_1.Include(file.name, file.path)); });
                        collectionFileTuples = this.getCollectionFileTuples(specialDirs);
                        // TODO queue + limited number of workers?
                        return [4 /*yield*/, Promise.all(collectionFileTuples.map(function (_a) {
                                var collection = _a.collection, file = _a.file;
                                return __awaiter(_this, void 0, void 0, function () {
                                    var matter, page;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, this.frontMatter.read(file)];
                                            case 1:
                                                matter = _b.sent();
                                                page = this.pageFactory.create(file, collection, matter);
                                                paramorph.addPage(page);
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            }))];
                    case 2:
                        // TODO queue + limited number of workers?
                        _a.sent();
                        this.addTags(paramorph);
                        this.generateMissingDescriptions(paramorph);
                        this.addDefaultImages(paramorph);
                        this.validatePages(paramorph);
                        this.validateCategories(paramorph);
                        return [2 /*return*/, paramorph];
                }
            });
        });
    };
    Loader.prototype.getCollectionFileTuples = function (specialDirs) {
        return [].concat.apply([], Object.keys(specialDirs.collections)
            .map(function (collection) {
            var sourceFiles = specialDirs.collections[collection];
            return sourceFiles.map(function (file) { return ({ file: file, collection: collection }); });
        }));
    };
    Loader.prototype.addTags = function (paramorph) {
        var pages = Object.keys(paramorph.pages)
            .map(function (key) { return paramorph.pages[key]; });
        var tagPage = paramorph.pages[TAG_PAGE_URL];
        if (!tagPage) {
            throw new Error("Couldn't find page of url '" + TAG_PAGE_URL + "' (used to render tag pages)");
        }
        var tagFactory = new TagFactory_1.TagFactory(tagPage);
        pages.forEach(function (page) {
            page.tags.forEach(function (title) {
                var tag = tagFactory.create(title);
                if (paramorph.pages.hasOwnProperty(tag.url)) {
                    // In case there is a separately defined page for this tag.
                    return;
                }
                paramorph.addPage(tag);
            });
        });
    };
    Loader.prototype.generateMissingDescriptions = function (paramorph) {
        var _this = this;
        var history = history_1.createMemoryHistory();
        var renderer = new renderers_1.LoaderRenderer(history, paramorph);
        var pages = Object.keys(paramorph.pages)
            .map(function (key) { return paramorph.pages[key]; });
        var index = paramorph.pages['/'];
        pages.forEach(function (page) {
            if (page.description || !page.output) {
                return;
            }
            if (page instanceof model_1.Tag) {
                Object.defineProperty(page, 'description', {
                    get: function () { return _this.descriptionFromPages(index, page); },
                    set: function () { throw new Error('Page.description is readonly'); },
                });
            }
            else {
                Object.defineProperty(page, 'description', {
                    get: function () { return _this.descriptionFromContent(renderer, page); },
                    set: function () { throw new Error('Page.description is readonly'); },
                });
            }
        });
    };
    Loader.prototype.addDefaultImages = function (paramorph) {
        var _this = this;
        var history = history_1.createMemoryHistory();
        var renderer = new renderers_1.LoaderRenderer(history, paramorph);
        var pages = Object.keys(paramorph.pages)
            .map(function (key) { return paramorph.pages[key]; });
        pages.forEach(function (page) {
            if (page.image || !page.output) {
                return;
            }
            Object.defineProperty(page, 'image', {
                get: function () { return _this.imageFromContent(renderer, page); },
                set: function () { throw new Error('Page.image is readonly'); }
            });
        });
    };
    Loader.prototype.descriptionFromContent = function (renderer, page) {
        return utils_1.removeEntities(utils_1.stripTags(renderer.render(page)));
    };
    Loader.prototype.descriptionFromPages = function (index, page) {
        return utils_1.removeEntities(index.title + " " + page.title + ": " + page.pages.map(function (p) { return p.title; }).join(', '));
    };
    Loader.prototype.imageFromContent = function (renderer, page) {
        var markup = renderer.render(page);
        var found = /<img[^>]* src="([^"]*)"[^>]*>/.exec(markup);
        if (!found) {
            console.warn("Couldn't find image on page " + page.url + "; page.image is null");
            return null;
        }
        return found[1];
    };
    Loader.prototype.validatePages = function (paramorph) {
        var pages = Object.keys(paramorph.pages)
            .map(function (key) { return paramorph.pages[key]; });
        var missingDescription = pages
            .filter(function (p) { return p.description === '' && p.output; })
            .map(function (p) { return p.title; });
        if (missingDescription.length !== 0) {
            throw new Error("Description missing in pages " + JSON.stringify(missingDescription) + ". Write some text in the article or add 'description' field.");
        }
    };
    Loader.prototype.validateCategories = function (paramorph) {
        var pages = Object.keys(paramorph.pages)
            .map(function (key) { return paramorph.pages[key]; });
        var missing = [];
        pages.forEach(function (page) {
            page.categories.forEach(function (category) {
                if (!paramorph.categories.hasOwnProperty(category)) {
                    missing.push({ page: page.url, category: category });
                }
            });
        });
        if (missing.length !== 0) {
            throw new Error("Couldn't find category page(s): " + JSON.stringify(missing));
        }
    };
    return Loader;
}());
exports.Loader = Loader;
exports.default = Loader;
//# sourceMappingURL=Loader.js.map