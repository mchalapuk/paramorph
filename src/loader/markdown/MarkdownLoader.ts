
import * as webpack from 'webpack';

import MarkdownCompiler from './MarkdownCompiler';
import ComponentTemplate from './ComponentTemplate';
import TypeScriptCompiler from './TypeScriptCompiler';

const markdown = new MarkdownCompiler();
const template = new ComponentTemplate();
const typescript = new TypeScriptCompiler();

export function MarkdownLoader(this : webpack.loader.LoaderContext, source : string) {
  this.cacheable && this.cacheable();
  const callback = this.async();

  if (!callback) {
    throw new Error('MarkdownLoader: couldn\'t create callback.');
  }
  const configUrl = this.resolveSync(this.context, '@website/_config');
  this.addDependency(configUrl);

  this.loadModule(configUrl, (err, configSource) => {
    if (err) {
      this.emitError(err);
      return;
    }

    try {
      const exports = this.exec(configSource, '_config.yml');
      const paramorph = exports.default;

      const html = markdown.toHtml(source, this.resourcePath);
      const tsSource = template.compile(html, paramorph);
      const output = typescript.compile(tsSource, this.resourcePath);

      callback(null, output);

    } catch (e) {
      callback(err);
    }
  });
};

export default MarkdownLoader;

