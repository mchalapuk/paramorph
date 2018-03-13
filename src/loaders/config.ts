import { parse } from '../config';
import { load } from '../Paramorph';

module.exports = function configLoader(source : string) {
  return load(parse(source)).uneval('paramorph') +';\nmodule.exports = paramorph;\n';
};

