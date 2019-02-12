
import check from 'offensive';
import 'offensive/assertions/anObject/register';
import 'offensive/assertions/aString/register';
import 'offensive/assertions/aBoolean/register';
import 'offensive/assertions/aDate/register';
import 'offensive/assertions/oneOf/register';
import 'offensive/assertions/Undefined/register';
import 'offensive/assertions/fieldThat/register';
import 'offensive/assertions/allElementsThat/register';

import { Page, Collection, Category } from '../../model';

import SourceFile from './SourceFile';

export interface Matter {
  date : Date;
  role ?: string;
  title ?: string;
  description ?: string;
  permalink ?: string;
  layout ?: string;
  image ?: string;
  output ?: boolean;
  categories ?: string[];
  category ?: string;
  tags ?: string[];
  feed ?: boolean;
}

export interface PageConstructor {
  new(
    url : string,
    title : string,
    description : string,
    image : string | null,
    collection : string,
    layout : string,
    source : string,
    output : boolean,
    feed : boolean,
    categories : string[],
    tags : string[],
    timestamp : number,
  ) : Page;
}

const DEFAULT_LAYOUT_NAME = "default";

export class PageFactory {
  create(file : SourceFile, collection : Collection, maybeMatter : any) : Page {
    const frontMatter = validateFrontMatter(file.name, maybeMatter);

    const role = (frontMatter.role || 'page').toLowerCase();
    switch (role) {
      case 'page':
        return this.create0(Page as PageConstructor, file, collection, frontMatter);
      case 'category':
        return this.create0(Category as PageConstructor, file, collection, frontMatter);
      default:
        throw new Error(`Unknown role: '${role}'`);
    }
  }

  private create0(
    PageType : PageConstructor,
    file : SourceFile,
    collection : Collection,
    matter : Matter,
  ) {
    const title = matter.title || defaultTitle(file);

    const categories = matter.categories || [];
    if (matter.category) {
      categories.push(matter.category);
    }

    return new PageType(
      matter.permalink || defaultUrl(title),
      title,
      matter.description || '',
      matter.image || null,
      collection.title,
      matter.layout || collection.layout || DEFAULT_LAYOUT_NAME,
      file.path,
      matter.output !== undefined
        ? matter.output
        : (collection.output !== undefined ? collection.output : true ),
      matter.feed !== undefined ? matter.feed : true,
      categories,
      matter.tags || [],
      new Date(matter.date).getTime(),
    );
  }
}

export default PageFactory;

const VALID_ROLES = ['', null, 'page', 'Page', 'PAGE', 'category', 'Category', 'CATEGORY'];

function validateFrontMatter(fileName : string, matter : any) {
  return check(matter, `pages['${fileName}']`)
    .has.fieldThat('date', date => date.is.aDate)
    .and.fieldThat('role', role => role
      .is.oneOf(VALID_ROLES, `be 'page' or 'category'`)
      .or.Undefined
    )
    .and.fieldThat('title', title => title.is.aString.or.Undefined)
    .and.fieldThat('description', desc => desc.is.aString.or.Undefined)
    .and.fieldThat('permalink', permalink => permalink.is.aString.or.Undefined)
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
  () as Matter;
}

function defaultTitle(file : SourceFile) {
  const title = `${file.name.charAt(0).toUpperCase()}${file.name.substring(1).replace(/-/g, ' ')}`;
  console.warn(`title of ${file.path} is not defined; defaulting to ${title}`);
  return title;
}

function defaultUrl(title : string) {
  return `/${title.toLowerCase().replace(/ /g, '-')}`;
}

