
import { Post, Collection, Category } from '../../model';

import Matter from './Matter';
import SourceFile from './SourceFile';

const DEFAULT_LIMIT = 5;

export interface PostConstructor {
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
    limit : number,
    categories : string[],
    tags : string[],
    timestamp : number,
  ) : Post;
}

const DEFAULT_LAYOUT_NAME = "default";

export class PostFactory {
  create(file : SourceFile, collection : Collection, frontMatter : Matter) : Post {
    const role = (frontMatter.role || 'post').toLowerCase();

    switch (role) {
      case 'post':
        return this.create0(Post as PostConstructor, file, collection, frontMatter);
      case 'category':
        return this.create0(Category as PostConstructor, file, collection, frontMatter);
      default:
        throw new Error(`Unknown role: '${role}'`);
    }
  }

  private create0(
    PostType : PostConstructor,
    file : SourceFile,
    collection : Collection,
    matter : Matter,
  ) {
    const title = matter.title || defaultTitle(file);

    const categories = matter.categories || [];
    if (matter.category) {
      categories.push(matter.category);
    }

    return new PostType(
      matter.pathSpec
        ? addTrailingSlash(matter.pathSpec)
        : createUrl(file.name),
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
      matter.limit !== undefined
        ? matter.limit
        : (collection.limit !== undefined ? collection.limit : DEFAULT_LIMIT),
      categories,
      matter.tags || [],
      new Date(matter.date).getTime(),
    );
  }
}

export default PostFactory;

export function createUrl(maybeUrl : string) {
  if (maybeUrl === '/') {
    return maybeUrl;
  }
  const converted = maybeUrl.toLowerCase()
    .replace(/[ \n\r,_\/\\—–.`~+*'"‘’“”:;()\[\]#?&]/g, '-')
    .replace(/-+/g, '-')
    .concat('-')
    .replace(/(^-|-$)/g, '')
  ;

  let index = -1;
  do {
    index = converted.indexOf('-', index + 1);
  } while (index < 64 && index !== -1);

  if (index === -1) {
    return `/${converted}/`;
  } else {
    return `/${converted.substring(0, index)}/`;
  }
}

function addTrailingSlash(pathSpec : string) {
  return `${pathSpec}${pathSpec.match(/\/$/) ? '' : '/'}`;
}

function defaultTitle(file : SourceFile) {
  const title = `${file.name.charAt(0).toUpperCase()}${file.name.substring(1).replace(/-/g, ' ')}`;
  console.warn(`title of ${file.path} is not defined; defaulting to ${title}`);
  return title;
}

