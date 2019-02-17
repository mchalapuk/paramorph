
import * as MarkdownIt from 'markdown-it';

const DELIMITER = '---\n';
const MAX_FM_SIZE = 2048;

export class MarkdownCompiler {
  private readonly markdownIt : MarkdownIt;

  constructor() {
    this.markdownIt = new MarkdownIt({
      html: true,
      xhtmlOut: true,
      breaks: false,
      linkify: true,
    });
  }

  toHtml(source : string, fileName : string) : string {
    const markdownSource = removeFrontMatter(fileName, source);

    const html = this.markdownIt.render(markdownSource)
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/…/g, '...')
    ;

    return html;
  }
}

export default MarkdownCompiler;

function removeFrontMatter(path : string, source : string) {
  if (source.substring(0, 4) !== DELIMITER) {
    throw new Error(`Couldn't find front matter data at the beginning of ${
      path}; expected '---\\n'; got '${source.substring(0, 4)}'.`);
  }
  const end = source.indexOf(`\n${DELIMITER}`, 4);
  if (end === -1) {
    throw new Error(`Couldn't find end of front matter data in first ${
      MAX_FM_SIZE} bytes of ${path}.`);
  }
  return source.substring(end + 4);
}

