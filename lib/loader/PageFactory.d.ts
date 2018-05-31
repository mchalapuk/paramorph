import { Page } from '../model';
import { SourceFile } from './ProjectStructure';
export declare class PageFactory {
    create(file: SourceFile, collection: string, frontMatter: any): Page;
}
export default PageFactory;
