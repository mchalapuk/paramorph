import 'offensive/assertions/anObject/register';
import 'offensive/assertions/aString/register';
import 'offensive/assertions/aBoolean/register';
import 'offensive/assertions/aDate/register';
import 'offensive/assertions/oneOf/register';
import 'offensive/assertions/Undefined/register';
import 'offensive/assertions/fieldThat/register';
import 'offensive/assertions/allElementsThat/register';
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
