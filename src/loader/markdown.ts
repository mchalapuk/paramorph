import { getOptions } from 'loader-utils';
const Markdown = require('markdown-it');

const { readFileSync } = require('fs');
const path = require('path');

const template = loadTemplate();

const DELIMITER = '---\n';
const MAX_FM_SIZE = 2048;

module.exports = function markdownLoader(source : string) {
  const that = this as any;

  that.cacheable && that.cacheable();
  const opts = getOptions(that) || {};
  const md = newMarkdown(opts);

  const markdownSource = removeFrontMatter(that.resourcePath, source);
  const html = md.render(markdownSource)
    .replace('&lt;', '<')
    .replace('&gt;', '>')
    .replace('…', '...')
  ;

  return template.replace('{ this.props.children }', html);
};

function newMarkdown(opts : any) {
  let md = new Markdown(opts);

  const plugins = opts.plugins = [];
  for (var i = 0 ; i < plugins.length; ++i) {
    md = md.use(plugins[i]);
  }
  return md;
}

function removeFrontMatter(path : string, source : string) {
  if (source.substring(0, 4) !== DELIMITER) {
    throw new Error(`Couldn't find front matter data at the beginning of ${
      path}; expected '---\\n'; got '${source.substring(0, 4)}'.`);
  }
  const end = source.indexOf(`\n${DELIMITER}`, 4);
  if (end === -1) {
    throw new Error(`Couldn't find end of front matter data in first ${
      MAX_FM_SIZE} bytes of ${path}.`);
  }
  return source.substring(end + 4);
}

function loadTemplate() {
  return readFileSync(path.join(__dirname, './MarkdownPage.js')).toString('utf8');
}

