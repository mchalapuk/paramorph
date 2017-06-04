const utils = require('loader-utils');

module.exports = function wrapWithJsxLoader(source) {
  this.cacheable && this.cacheable();
  const opts = utils.getOptions(this);
	const exports = this.exec(source, this.resource);
  const wrapped = opts.field ? exports[opts.field] : exports;

	if (typeof wrapped != 'string') {
    const variable = opts.field ? ('exports' + opts.field) : 'exports';
		throw new Error('wrapWithJsxloader expects '+ variable
      + ' property of type string; got ' + typeof wrapped
      + '\nopts=' + JSON.stringify(opts));
	}

  const template = 'import * as React from \'react\';\n'
    + 'export const component = data => (<div>%WRAPPED%</div>)\n';

  const sources = template.replace('%WRAPPED%', wrapped)
    + Object.keys(exports).map(key =>
      'export const ' + key + ' = ' + JSON.stringify(exports[key]) + ';\n'
    ).join('');

  return sources;
};

