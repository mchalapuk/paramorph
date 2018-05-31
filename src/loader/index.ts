import { parse } from '../config';
import FileSystem from '../platform/node/FileSystem';

import Loader from './Loader';
import ProjectStructure from './ProjectStructure';
import FrontMatter from './FrontMatter';
import PageFactory from './PageFactory';
import uneval from './uneval';

export type Callback = (error : any | null, source ?: string, map ?: any, meta ?: any) => void;

export interface WebpackLoader {
  async() : Callback;
}

module.exports = function configLoader(source : string, map : any, meta : any) {
  const that = this as any as WebpackLoader;
  const callback = that.async();

  const fs = new FileSystem();
  const loader = new Loader(new ProjectStructure(fs), new FrontMatter(fs), new PageFactory());

  loader.load(parse(source))
    .then(paramorph => {
      const source = uneval(paramorph, 'paramorph') +';\nmodule.exports = paramorph;\n';
      callback(null, source, map, meta);
    })
    .catch(err => {
      callback(err);
    });
};

