
import * as Markdown from 'markdown-it';
import { readFile } from 'fs';
import { promisify } from 'util';

import { Page } from '../model';

const readFileAsync = promisify(readFile);

const DELIMITER = '---\n';
const MAX_FM_SIZE = 2048;

export class LoaderRenderer {
  async render(page : Page) : Promise<string> {
    const source = await readFileAsync(page.source);
    const markdownSource = removeFrontMatter(page.source, source.toString('utf-8'));

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

