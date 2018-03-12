import { load } from '../config';

module.exports = function configLoader(source : string) {
  return 'module.exports = '+ JSON.stringify(load(source)) +';';
};

