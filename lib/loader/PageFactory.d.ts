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
export interface PageConstructor {
    new (url: string, title: string, description: string, image: string | null, collection: string, layout: string, source: string, output: boolean, feed: boolean, categories: string[], tags: string[], timestamp: number): Page;
}
export declare class PageFactory {
    create(file: SourceFile, collection: string, maybeMatter: any): Page;
    private create0;
}
export default PageFactory;
