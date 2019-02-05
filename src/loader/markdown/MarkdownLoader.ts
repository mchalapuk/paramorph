
import * as webpack from 'webpack';
import Module = require('module');

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
  const configUrl = this.resolve(this.context, '@website/_config', (err, configUrl) => {
    if (err) {
      this.emitError(err);
      return;
    }

    this.loadModule(configUrl, (err, configSource) => {
      if (err) {
        this.emitError(err);
        return;
      }

      try {
        const paramorph = exec.call(this, configSource, '_config.yml');

        const html = markdown.toHtml(source, this.resourcePath);
        const tsSource = template.compile(html, paramorph);
        const output = typescript.compile(tsSource, this.resourcePath);

        callback(null, output);

      } catch (e) {
        callback(err);
      }
    });
  });
};

export default MarkdownLoader;

function exec(this : webpack.loader.LoaderContext, source : string, url : string) {
  const module = new Module(url, this as any);
  module.paths = (Module as any)._nodeModulePaths(this.context);
  module.filename = url;
  (module as any)._compile(source, url);
  return module.exports.default;
}

