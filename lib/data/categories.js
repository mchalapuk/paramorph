"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var collections_1 = require("./collections");
var categories = collections_1.default.reduce(function (p, c) { return p.concat(c.pages); }, [])
    .filter(function (page) { return page instanceof models_1.Category; });
exports.default = categories;
