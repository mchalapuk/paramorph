"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loader_utils_1 = require("loader-utils");
module.exports = function addDataToGlobalsLoader(source) {
    var that = this;
    that.cacheable && that.cacheable();
    var opts = loader_utils_1.getOptions(that);
    if (typeof opts.data != 'string') {
        throw new Error('addDataToGlobalsLoader expects data option'
            + 'of type string; got ' + typeof opts.data);
    }
    return 'global.__data = require(\'paramorph/data/' + opts.data + '\').default;\n\n'
        + 'const code = global.__data\n'
        + '  .map((entry, index) => `var ${entry.name} = this.__data[${index}].component;`)\n'
        + '  .join(\'\')\n;'
        + 'eval.call(null, code);\n'
        + 'delete global.__data;\n\n'
        + source;
};
