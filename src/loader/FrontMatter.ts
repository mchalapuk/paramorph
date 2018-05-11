
import { safeLoad } from 'js-yaml';

import { SourceFile } from './ProjectStructure';
import { FileSystem } from '../platform/interface/FileSystem';

const DELIMITER = '---\n';
const MAX_FM_SIZE = 2048;

export class FrontMatter {
  constructor(private fs : FileSystem) {
  }

  async read(file : SourceFile) : Promise<any> {
    const source = await this.fs.read(file.path, MAX_FM_SIZE);
    if (source.substring(0, 4) !== DELIMITER) {
      throw new Error(`Couldn't find front matter data at the beginning of ${
        file.path}; expected '---\\n'; got '${source.substring(0, 4)}'.`);
    }
    const end = source.indexOf(`\n${DELIMITER}`, 4);
    if (end === -1) {
      throw new Error(`Couldn't find end of front matter data in first ${
        MAX_FM_SIZE} bytes of ${file.path}.`);
    }
    const yamlSource = source.substring(4, end);
    return safeLoad(yamlSource);
  }
}

export default FrontMatter;

