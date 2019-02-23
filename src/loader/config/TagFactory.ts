
import { Page, Tag } from '../../model';
import { defaultUrl } from './PageFactory';

export class TagFactory {
  constructor(
    private tagPage : Page,
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
    } = this.tagPage;

    return new Tag(
      `/tags${defaultUrl(title)}`,
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

