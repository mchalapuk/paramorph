
import { Page } from '../model';
import { SourceFile } from './ProjectStructure';

export class PageFactory {
  create(file : SourceFile, collection : string, frontMatter : any) : Page {
    return null as any as Page;
  }
}

export default PageFactory;

