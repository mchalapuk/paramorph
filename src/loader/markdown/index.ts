
import * as webpack from 'webpack';
import Module = require('module');

import MarkdownLoader from './MarkdownLoader';

export = markdownLoader;

function markdownLoader(this : webpack.loader.LoaderContext, source : string) {
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
        const loader = new MarkdownLoader();
        const paramorph = exec.call(this, configSource, '_config.yml');

        const output = loader.load(source, this.resourcePath, paramorph);

        callback(null, output);
      } catch (e) {
        callback(err);
      }
    });
  });
};

function exec(this : webpack.loader.LoaderContext, source : string, url : string) {
  const module = new Module(url, this as any);
  module.paths = (Module as any)._nodeModulePaths(this.context);
  module.filename = url;
  (module as any)._compile(source, url);
  return module.exports.default;
}

