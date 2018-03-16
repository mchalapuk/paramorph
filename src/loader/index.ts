import { parse } from '../config';
import load from './load';
import uneval from './uneval';

export type Callback = (error : any | null, source ?: string, map ?: any, meta ?: any) => void;

export interface WebpackLoader {
  async() : Callback;
}

module.exports = function configLoader(source : string, map : any, meta : any) {
  const loader = this as any as WebpackLoader;
  const callback = loader.async();

  load(parse(source))
    .then(paramorph => {
      const source = uneval(paramorph, 'paramorph') +';\nmodule.exports = paramorph;\n';
      callback(null, source, map, meta);
    })
    .catch(err => {
      callback(err);
    });
};

