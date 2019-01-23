
import * as webpack from 'webpack';

import { parse } from '../../config';
import FileSystem from '../../platform/node/FileSystem';
import LoaderRenderer from '../../renderers/loader';

import ConfigLoader from './ConfigLoader';
import ProjectStructure from './ProjectStructure';
import FrontMatter from './FrontMatter';
import PageFactory from './PageFactory';
import uneval from './uneval';

export = loader;

function loader(this : webpack.loader.LoaderContext, source : string, map : any) {
  const callback = this.async() as webpack.loader.loaderCallback;

  const fs = new FileSystem();

  const loader = new ConfigLoader(
    new ProjectStructure(fs),
    new FrontMatter(fs),
    new PageFactory(),
    new LoaderRenderer(fs),
  );

  loader.load(parse(source))
    .then(paramorph => {
      const source = 'const { Paramorph, Layout, Include, Page, Category, Tag } '
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

