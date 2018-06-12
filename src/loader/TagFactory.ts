
import { Page, Tag } from '../model';

export class TagFactory {
  constructor(private tagPage : Page) {
  }

  create(title : string) {
    return new Tag(
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

