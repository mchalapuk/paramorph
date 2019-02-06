
import * as webpack from 'webpack';
import * as path from 'path'

import FileSystem from '../../platform/node/FileSystem';
import MarkdownLoader from '../markdown/MarkdownLoader';

import ConfigParser from './ConfigParser';
import ConfigLoader from './ConfigLoader';
import ProjectStructure from './ProjectStructure';
import FrontMatter from './FrontMatter';
import PageFactory from './PageFactory';
import uneval from './uneval';

export = loader;

function loader(this : webpack.loader.LoaderContext, source : string, map : any) {
  const callback = this.async() as webpack.loader.loaderCallback;

  const fs = new FileSystem();
  const parser = new ConfigParser();

  const loader = new ConfigLoader(
    new ProjectStructure(fs),
    new FrontMatter(fs),
    new PageFactory(),
    new MarkdownLoader(),
    fs,
  );

  loader.load(parser.parse(source))
    .then(paramorph => {
      Object.keys(paramorph.pages)
        .map(url => path.join(process.cwd(), url))
        .forEach(url => this.addDependency(url))
      ;

      const source = 'const { Paramorph, Layout, Include, Page, Collection, Category, Tag } '
        +'= require(\'paramorph/model\');\n'
        + uneval(paramorph, 'paramorph')
        +';\nmodule.exports.default = paramorph;\n'
      ;
      callback(null, source, map);
    })
    .catch(err => {
      callback(err);
    })
  ;
};

