import { parse } from '../config';
import load from './load';
import uneval from './uneval';

module.exports = function configLoader(source : string) {
  return uneval(load(parse(source)), 'paramorph') +';\nmodule.exports = paramorph;\n';
};

