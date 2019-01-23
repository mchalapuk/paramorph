
import * as webpack from 'webpack';

import MarkdownCompiler from './MarkdownCompiler';
import ComponentTemplate from './ComponentTemplate';
import TypeScriptCompiler from './TypeScriptCompiler';

const markdown = new MarkdownCompiler();
const template = new ComponentTemplate();
const typescript = new TypeScriptCompiler();

export function MarkdownLoader(this : webpack.loader.LoaderContext, source : string) {
  this.cacheable && this.cacheable();

  const html = markdown.toHtml(source, this.resourcePath);
  const tsSource = template.compile(html);
  const output = typescript.compile(tsSource, this.resourcePath);

  return output;
};

export default MarkdownLoader;

