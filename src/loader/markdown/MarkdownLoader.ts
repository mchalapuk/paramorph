
import SourceFile from '../config/SourceFile';

import MarkdownCompiler from './MarkdownCompiler';
import ComponentTemplate from './ComponentTemplate';
import TypeScriptCompiler from './TypeScriptCompiler';

export class MarkdownLoader {
  constructor(
    private readonly markdown : MarkdownCompiler,
    private readonly template : ComponentTemplate,
    private readonly typescript : TypeScriptCompiler,
  ) {
  }

  load(source : string, fileName : string) {
    const html = this.markdown.toHtml(source, fileName);
    const tsSource = this.template.compile(html);
    const output = this.typescript.compile(tsSource, fileName);
    return output;
  }
};

export default MarkdownLoader;

