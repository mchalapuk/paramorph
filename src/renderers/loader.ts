
import * as Markdown from 'markdown-it';
import { promisify } from 'util';

import { FileSystem } from '../platform/interface/FileSystem';
import { Page } from '../model';

const DELIMITER = '---\n';
const MAX_FM_SIZE = 2048;

export class LoaderRenderer {
  constructor(
    private fs : FileSystem,
  ) {
  }

  async render(page : Page) : Promise<string> {
    const source = await this.fs.read(page.source, 2048);
    const markdownSource = removeFrontMatter(page.source, source);

    const md = new Markdown();
    const html = md.render(markdownSource)
      .replace('&lt;', '<')
      .replace('&gt;', '>')
      .replace('…', '...')
    ;
    return html;
  }
}

export default LoaderRenderer;

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

