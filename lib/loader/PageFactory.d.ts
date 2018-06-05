import { Page } from '../model';
import { SourceFile } from './ProjectStructure';
export interface Matter {
    date: Date;
    role?: string;
    title?: string;
    description?: string;
    permalink?: string;
    layout?: string;
    image?: string;
    output?: boolean;
    categories?: string[];
    category?: string;
    tags?: string[];
    feed?: boolean;
}
export declare class PageFactory {
    create(file: SourceFile, collection: string, maybeMatter: any): Page;
}
export default PageFactory;
