const ejs = require('ejs');
const utils = require('loader-utils');

module.exports = function ejsLoader(source) {
  this.cacheable && this.cacheable();
  const opts = Object.assign(utils.getOptions(this) || {}, { client : true });
	const exports = this.exec(source, this.resource);

	if (typeof exports.body != 'string') {
		throw new Error('ejsloader expects body property of type string; got '
			+ typeof exports.body);
	}

  const template = ejs.compile(exports.body.replace('&lt;%', '<%').replace('%&gt;', '%>'), opts);
  const placeholder = '%<|:template:|>%';

	return 'module.exports = '
    + JSON.stringify({ frontMatter: exports.frontMatter, template: placeholder })
    .replace('"'+ placeholder +'"', template.toString());
}

