import { getOptions } from 'loader-utils';

module.exports = function addDataToGlobalsLoader(source : string) {
  const that = this as any;

  that.cacheable && that.cacheable();
  const opts = getOptions(that);

	if (typeof opts.data != 'string') {
		throw new Error('addDataToGlobalsLoader expects data option'
      + 'of type string; got ' + typeof opts.data);
	}

  return 'global.__data = require(\'paramorph/data/'+ opts.data +'\').default;\n\n'
    + 'const code = global.__data\n'
    + '  .map((entry, index) => `var ${entry.name} = this.__data[${index}].component;`)\n'
    + '  .join(\'\')\n;'
    + 'eval.call(null, code);\n'
    + 'delete global.__data;\n\n'
    + source;
};

