"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Paramorph = /** @class */ (function () {
    function Paramorph() {
    }
    Paramorph.prototype.uneval = function (varName) {
        if (varName === void 0) { varName = 'paramorph'; }
        return "const " + varName + " = new Paramorph();";
    };
    return Paramorph;
}());
exports.Paramorph = Paramorph;
function load(config) {
    return new Paramorph();
}
exports.load = load;
