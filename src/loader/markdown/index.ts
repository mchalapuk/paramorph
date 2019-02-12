
import * as webpack from 'webpack';
import Module = require('module');

import FileSystem from '../../platform/node/FileSystem';
import DirectoryScanner from '../config/DirectoryScanner';
import { INCLUDES_DIR, JS_REGEX } from '../config/ProjectStructure';

import MarkdownLoader from './MarkdownLoader';

export = markdownLoader;

function markdownLoader(this : webpack.loader.LoaderContext, source : string) {
  this.cacheable && this.cacheable();
  const callback = this.async();

  if (!callback) {
    throw new Error('MarkdownLoader: couldn\'t create callback.');
  }

  const fs = new FileSystem();
  const scanner = new DirectoryScanner(fs);

  scanner.scanDir(`./${INCLUDES_DIR}`, JS_REGEX)
    .then(
      includes => {
        try {
          const loader = new MarkdownLoader();
          const output = loader.load(source, this.resourcePath, includes);

          callback(null, output);
        } catch (err) {
          callback(err);
        }
      },
      err => callback(err),
    )
  ;
};

