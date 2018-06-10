
import check from 'offensive';

import { Page, Category } from '../model';
import { SourceFile } from './ProjectStructure';

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

export class PageFactory {
  create(file : SourceFile, collection : string, maybeMatter : any) : Page {
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
    collection : string,
    matter : Matter,
  ) {
    const categories = matter.categories || [];
    if (matter.category) {
      categories.push(matter.category);
    }

    const title = matter.title || defaultTitle(file);

    return new PageType(
      matter.permalink || '',
      title,
      matter.description || '',
      matter.image || null,
      collection,
      matter.layout || '',
      file.path,
      matter.output || true,
      matter.feed || true,
      categories,
      matter.tags || [],
      new Date(matter.date).getTime(),
    );
  }
}

export default PageFactory;

const VALID_ROLES = ['', null, 'page', 'Page', 'PAGE', 'category', 'Category', 'CATEGORY'];

function validateFrontMatter(fileName : string, matter : any) {
  const namePrefix = `pages['${fileName}']`;
  check(matter, `${namePrefix}.matter`).is.anObject();

  const date = safeParseDate(
    check(matter.date, `${namePrefix}.date`).is.aString() as string,
    `${namePrefix}.date`,
  );
  const role = check(matter.role, `${namePrefix}.role`)
    .is.either.containedIn(VALID_ROLES, '\'page\' or \'category\'')
    .or.Undefined() as string | undefined
  ;
  const title = check(matter.title, `${namePrefix}.title`)
    .is.either.aString
    .or.Undefined() as string | undefined
  ;
  const description = check(matter.description, `${namePrefix}.description`)
    .is.either.aString
    .or.Undefined() as string | undefined
  ;
  const permalink = check(matter.permalink, `${namePrefix}.permalink`)
    .is.either.aString
    .or.Undefined() as string | undefined
  ;
  const layout = check(matter.layout, `${namePrefix}.layout`)
    .is.either.aString
    .or.Undefined() as string | undefined
  ;
  const image = check(matter.image, `${namePrefix}.image`)
    .is.either.aString
    .or.Undefined() as string | undefined
  ;
  const output = check(matter.output, `${namePrefix}.output`)
    .is.either.aBoolean
    .or.Undefined() as boolean | undefined
  ;
  const categories = check(matter.categories, `${namePrefix}.categories`)
    .either.contains.onlyStrings
    .or.is.Undefined() as string[] | undefined
  ;
  const category = check(matter.category, `${namePrefix}.category`)
    .is.either.aString
    .or.Undefined() as string | undefined
  ;
  const tags = check(matter.tags, `${namePrefix}.tags`)
    .either.contains.onlyStrings
    .or.is.Undefined() as string[] | undefined
  ;
  const feed = check(matter.feed, `${namePrefix}.feed`)
    .is.either.aBoolean
    .or.Undefined() as boolean | undefined
  ;

  return {
    date,
    role,
    title,
    description,
    permalink,
    layout,
    image,
    output,
    categories,
    category,
    tags,
    feed,
  };
}

function safeParseDate(dateString : string, variableName : string) : Date {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${variableName} must be a valid date; got '${dateString}'`);
  }
  return date;
}

function defaultTitle(file : SourceFile) {
  const title = `${file.name.charAt(0).toUpperCase()}${file.name.substring(1).replace(/-/g, ' ')}`;
  console.warn(`title of ${file.path} is not defined; defaulting to ${title}`);
  return title;
}

