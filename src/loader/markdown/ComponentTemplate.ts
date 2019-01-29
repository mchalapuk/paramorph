
import * as fs from 'fs';
import * as path from 'path';

const CHILDREN_PLACEHOLDER = '{ PLACEHOLDER }';
const DEFAULT_TEMPLATE = loadTemplate();

export class ComponentTemplate {
  constructor(
    private readonly templateSource : string = DEFAULT_TEMPLATE,
  ) {
    if (templateSource.indexOf(CHILDREN_PLACEHOLDER) === -1) {
      throw new Error(`template does not contain placeholder for children: ${CHILDREN_PLACEHOLDER}`);
    }
  }
  compile(source : string) {
    return this.templateSource.replace(CHILDREN_PLACEHOLDER, source);
  }
}

export default ComponentTemplate;

function loadTemplate() {
  return fs.readFileSync(path.join(__dirname, './MarkdownPage.tsx')).toString('utf8');
}

