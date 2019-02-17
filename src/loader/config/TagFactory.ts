
import { Page, Tag } from '../../model';
import { defaultUrl } from './PageFactory';

export class TagFactory {
  constructor(
    private tagPage : Page,
  ) {
  }

  create(title : string) {
    return new Tag(
      `/tags${defaultUrl(title)}`,
      title,
      this.tagPage.description,
      this.tagPage.image,
      this.tagPage.layout,
      this.tagPage.source,
      true,
      this.tagPage.timestamp,
    );
  }
}

export default TagFactory;

