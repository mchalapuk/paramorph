import { getOptions } from 'loader-utils';
const Markdown = require('markdown-it');

module.exports = function markdownLoader(source : string) {
  const that = this as any;

  that.cacheable && that.cacheable();
  const opts = getOptions(that);
  const md = new Markdown(opts);

	const exports = that.exec(source, that.resource);

	if (typeof exports.body != 'string') {
		throw new Error('markdownloader expects body property of type string; got '
			+ typeof exports.body);
	}

  const body = md.render(exports.body)
    .replace('&lt;', '<')
    .replace('&gt;', '>')
    .replace('…', '...');

  return 'module.exports = '+ JSON.stringify({
    frontMatter: exports.attributes,
    body,
    raw: exports.body
  });
};

