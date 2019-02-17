
import * as fs from 'fs';
import * as path from 'path';
import * as ejs from 'ejs';

import { Paramorph } from '../../model';

const DEFAULT_TEMPLATE = loadTemplate();

export class ComponentTemplate {
  constructor(
    private readonly templateSource : string = DEFAULT_TEMPLATE,
    private readonly data : any,
  ) {
  }
  compile(html : string) {
    return ejs.render(this.templateSource, { ...this.data, html });
  }
}

export default ComponentTemplate;

function loadTemplate() {
  return fs.readFileSync(path.join(__dirname, './MarkdownPage.tsx.ejs')).toString('utf8');
}

