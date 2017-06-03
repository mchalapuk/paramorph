const utils = require('loader-utils');
const fs = require('fs');
const path = require('path');

module.exports = function wrapWithReactLoader(source) {
  this.cacheable && this.cacheable();
  const opts = utils.getOptions(this);
	const exports = this.exec(source, this.resource);
  const wrapped = opts.field ? exports[opts.field] : exports;

	if (typeof wrapped != 'string') {
    const variable = opts.field ? ('exports' + opts.field) : 'exports';
		throw new Error('wrapWithReactloader expects '+ variable
      + ' property of type string; got ' + typeof wrapped
      + '\nopts=' + JSON.stringify(opts));
	}

  const template = fs.readFileSync(
    path.join(__dirname, 'reactWrapper.template.jsx'),
    { encoding: 'utf8' }
  );

  const sources = template.replace('%WRAPPED%', wrapped)
    + Object.keys(exports).map(key =>
      'export const ' + key + ' = ' + JSON.stringify(exports[key]) + ';\n'
    ).join('');

  return sources;
};

