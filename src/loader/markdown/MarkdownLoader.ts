
import { Paramorph } from '../../model';

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

  load(source : string, fileName : string, paramorph : Paramorph) {
    const html = this.markdown.toHtml(source, fileName);
    const tsSource = this.template.compile(html, paramorph);
    const output = this.typescript.compile(tsSource, fileName);
    return output;
  }
};

export default MarkdownLoader;

