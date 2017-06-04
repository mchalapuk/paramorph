const utils = require('loader-utils');
const Markdown = require('markdown-it');

module.exports = function markdownLoader(source) {
  this.cacheable && this.cacheable();
  const opts = utils.getOptions(this);
  const md = new Markdown(opts);

	const exports = this.exec(source, this.resource);

	if (typeof exports.body != 'string') {
		throw new Error('markdownloader expects body property of type string; got '
			+ typeof exports.body);
	}

  const body = md.render(exports.body)
    .replace('&lt;', '<')
    .replace('&gt;', '>')
    .replace('…', '...');

  return 'module.exports = '+ JSON.stringify({ frontMatter: exports.attributes, body: body });
};

