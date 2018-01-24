import { getOptions } from 'loader-utils';

module.exports = function wrapWithJsxLoader(source : string) {
  const that = this as any;

  that.cacheable && that.cacheable();
  const opts = getOptions(that);
	const exports = that.exec(source, that.resource);
  const wrapped = opts.field ? exports[opts.field] : exports;

	if (typeof wrapped != 'string') {
    const variable = opts.field ? ('exports' + opts.field) : 'exports';
		throw new Error('wrapWithJsxloader expects '+ variable
      + ' property of type string; got ' + typeof wrapped
      + '\nopts=' + JSON.stringify(opts));
	}
  const limit = exports.frontMatter.limit || opts.limit || 5;

  const template = 'import React from \'react\';\n'
    + 'import Content from \'paramorph/components/Content\';'
    + 'export const component = (data) => (\n'
    + '  <Content limit={ '+ limit +'} {...data}>%WRAPPED%</Content>\n'
    + ');\n';

  const sources = template.replace('%WRAPPED%', wrapped)
    + Object.keys(exports).map(key =>
      'export const ' + key + ' = ' + JSON.stringify(exports[key]) + ';\n'
    ).join('');

  return sources;
};

