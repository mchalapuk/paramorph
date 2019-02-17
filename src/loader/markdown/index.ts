
import * as webpack from 'webpack';
import * as utils from 'loader-utils';
import { promisify } from 'util';

import FileSystem from '../../platform/node/FileSystem';
import DirectoryScanner from '../config/DirectoryScanner';
import SourceFile from '../config/SourceFile';
import { INCLUDES_DIR, JS_REGEX } from '../config/ProjectStructure';

import MarkdownCompiler from './MarkdownCompiler';
import ComponentTemplate from './ComponentTemplate';
import TypeScriptCompiler from './TypeScriptCompiler';
import MarkdownLoader from './MarkdownLoader';

export = markdownLoader;

const ONE_MB = 1024*1024*1024;

function markdownLoader(this : webpack.loader.LoaderContext, source : string) {
  this.cacheable && this.cacheable();
  const callback = this.async() as webpack.loader.loaderCallback;

  const options = {
    template: 'paramorph/loader/markdown/MarkdownPage.tsx.ejs',
    ...(utils.getOptions(this) || {}),
  };
  const resolve = promisify(this.resolve.bind(this));

  const fs = new FileSystem();
  const scanner = new DirectoryScanner(fs);

  const templateLoaded = resolve(this.context, options.template)
    .then((templatePath : string) => {
      this.addDependency(templatePath);
      return fs.read(templatePath, ONE_MB);
    })
  ;
  const includesScanned = scanner.scanDir(`./${INCLUDES_DIR}`, JS_REGEX);

  Promise.all([templateLoaded, includesScanned])
    .then(([templateSource, includes]) => {
      const loader = new MarkdownLoader(
        new MarkdownCompiler(),
        new ComponentTemplate(templateSource, { includes }),
        new TypeScriptCompiler(),
      );
      const output = loader.load(source, this.resourcePath);

      callback(null, output);
    })
    .catch(err => {
      callback(err);
    })
  ;
};

