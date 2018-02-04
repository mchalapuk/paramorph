
import requireDirectory, { Module } from './requireDirectory';
import { Include } from '../models';

const Context = require('./requireContext');

const includes = requireDirectory(Context.INCLUDES)
  .map((module : Module) => {
    const match = /^\.\/([^/]*)(\/index)?\.(j|t)sx?$/.exec(module.name);
    if (match === null) {
      return null;
    }
    const name = match[1];
    return new Include(name, module.exports.default);
  });

export default includes;

