
import { Post, Tag } from '../../model';
import { createUrl } from './PostFactory';

export class TagFactory {
  constructor(
    private tagPost : Post,
  ) {
  }

  create(title : string) {
    const {
      description,
      image,
      layout,
      source,
      limit,
      timestamp,
    } = this.tagPost;

    return new Tag(
      `/tags${createUrl(title)}:pageNumber?/`,
      title,
      description,
      image,
      layout,
      source,
      true,
      limit,
      timestamp,
    );
  }
}

export default TagFactory;

