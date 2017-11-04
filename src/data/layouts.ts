
import requireDirectory, { Module } from './requireDirectory';
import { Layout } from '../models';

const Context = require('./requireContext');

const layouts = requireDirectory(Context.LAYOUTS)
  .map((module : Module) => {
    const name = module.name.replace(/^\.\//, '').replace(/\.tsx$/, '');
    return new Layout(name, module.exports.default);
  });

export default layouts;

