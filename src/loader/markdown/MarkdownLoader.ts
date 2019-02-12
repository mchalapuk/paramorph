
import SourceFile from '../config/SourceFile';

import MarkdownCompiler from './MarkdownCompiler';
import ComponentTemplate from './ComponentTemplate';
import TypeScriptCompiler from './TypeScriptCompiler';

export class MarkdownLoader {
  constructor(
    private readonly markdown = new MarkdownCompiler(),
    private readonly template = new ComponentTemplate(),
    private readonly typescript = new TypeScriptCompiler(),
  ) {
  }

  load(source : string, fileName : string, includes : SourceFile[]) {
    const html = this.markdown.toHtml(source, fileName);
    const tsSource = this.template.compile(html, { includes });
    const output = this.typescript.compile(tsSource, fileName);
    return output;
  }
};

export default MarkdownLoader;

