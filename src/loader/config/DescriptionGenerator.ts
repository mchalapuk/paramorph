
import * as stripTags from 'striptags';

import { Post, Tag, Category } from '../../model';

export class DescriptionGenerator {
  constructor(
    private readonly sentenceLimit : number,
  ) {
  }
  generate(html : string, post : Post) : string {
    return this.limit(removeEntities(this.fromContent(html, post) || this.fromPosts(post)));
  }

  private fromContent(html : string, post: Post) {
    const spaced = html.replace(/\n/g, '')
      .replace(/(>)(<)/g, '$1 $2')
    ;
    return stripTags(spaced)
      .replace(/ +/g, ' ')
      .replace(/(^ +| +$)/g, '')
    ;
  }
  private fromPosts(post : Post) {
    if (!(post instanceof Tag || post instanceof Category)) {
      return '';
    }
    const { title, posts } = post as Tag | Category;

    const postsList = posts
      .map(post => post.title)
      .join(', ')
    ;
    return `${title}: ${postsList}`;
  }

  private limit(description : string) {
    const expression = /[^.!?]+[.!?]*/g;

    let sentences : string[] = [];
    let match : any;

    while ((match = expression.exec(description)) !== null) {
      sentences.push(match[0]);
    }
    if (sentences.length <= this.sentenceLimit) {
      return description;
    }
    return sentences.splice(0, this.sentenceLimit).join('');
  }
}

export default DescriptionGenerator;

function removeEntities(str : string) {
  return str
    .replace(/&#x22;/g, '\"')
    .replace(/&#x27;/g, '\'')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[^\s;]+;/g, '')
    .replace(/ +/g, ' ')
  ;
}

