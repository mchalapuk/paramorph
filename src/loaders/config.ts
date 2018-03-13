import { parse } from '../config';

module.exports = function configLoader(source : string) {
  return 'module.exports = '+ JSON.stringify(parse(source)) +';';
};

