"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requireDirectory(context) {
    return context.keys()
        .map(function (name) { return ({
        exports: context(name),
        name: name,
    }); });
}
exports.default = requireDirectory;
//# sourceMappingURL=requireDirectory.js.map