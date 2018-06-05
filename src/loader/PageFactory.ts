
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

export class PageFactory {
  create(file : SourceFile, collection : string, maybeMatter : any) : Page {
    const frontMatter = validateFrontMatter(file.name, maybeMatter);
    return null as any as Page;
  }
}

export default PageFactory;

function validateFrontMatter(fileName : string, matter : any) {
  const namePrefix = `pages['${fileName}']`;
  check(matter, `${namePrefix}.matter`).is.anObject();

  const date = safeParseDate(
    check(matter.date, `${namePrefix}.date`).is.aString() as string,
    `${namePrefix}.date`,
  );
  const role = check(matter.role, `${namePrefix}.role`)
    .is.either.aString
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

