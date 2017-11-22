
import requireDirectory, { Module } from './requireDirectory';
import { Include } from '../models';

const Context = require('./requireContext');

const includes = requireDirectory(Context.INCLUDES)
  .map((module : Module) => {
    const name = module.name.replace(/^\.\//, '').replace(/\.js$/, '');

    return new Include(name, module.exports.default);
  });

export default includes;

