
import { safeLoad } from 'js-yaml';

import check from 'offensive';
import 'offensive/assertions/anObject/register';
import 'offensive/assertions/aString/register';
import 'offensive/assertions/aBoolean/register';
import 'offensive/assertions/aNumber/register';
import 'offensive/assertions/aDate/register';
import 'offensive/assertions/oneOf/register';
import 'offensive/assertions/Undefined/register';
import 'offensive/assertions/fieldThat/register';
import 'offensive/assertions/allElementsThat/register';
import './DateStringAssertion';

import { FileSystem } from '../../platform/interface/FileSystem';
import SourceFile from './SourceFile';
import Matter from './Matter';

const DELIMITER = '---\n';
const MAX_FM_SIZE = 2048;

export class FrontMatter {
  constructor(
    private fs : FileSystem,
  ) {
  }

  async read(file : SourceFile) : Promise<Matter> {
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
    const json = safeLoad(yamlSource);

    return validate(file.path, json || {});
  }
}

export default FrontMatter;

const VALID_ROLES = ['', null, 'post', 'Post', 'PAGE', 'category', 'Category', 'CATEGORY'];

function validate(fileName : string, matter : any) {
  return check(matter, `posts['${fileName}']`)
    .has.fieldThat('date', date => date.is.aDateString)
    .and.fieldThat('role', role => role
      .is.oneOf(VALID_ROLES, `be 'post' or 'category'`)
      .or.Undefined
    )
    .and.fieldThat('title', title => title.is.aString.or.Undefined)
    .and.fieldThat('description', desc => desc.is.aString.or.Undefined)
    .and.fieldThat('pathSpec', pathSpec => pathSpec.is.aString.or.Undefined)
    .and.fieldThat('layout', layout => layout.is.aString.or.Undefined)
    .and.fieldThat('image', image => image.is.aString.or.Undefined)
    .and.fieldThat('output', output => output.is.aBoolean.or.Undefined)
    .and.fieldThat('categories', categories => categories
      .has.allElementsThat(elem => elem.is.aString)
      .or.is.Undefined
    )
    .and.fieldThat('category', category => category.is.aString.or.Undefined)
    .and.fieldThat('tags', tags => tags.has.allElementsThat(elem => elem.is.aString).or.Undefined)
    .and.fieldThat('feed', feed => feed.is.aBoolean.or.Undefined)
    .and.fieldThat('limit', limit => limit.is.aNumber.or.Undefined)
  () as Matter;
}

