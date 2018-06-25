import { Paramorph, Layout, Include, Page, Category, Tag } from '..';
export declare function uneval(paramorph: Paramorph, varName?: string): string;
export default uneval;
export declare function unevalLayout(layout: Layout): string;
export declare function unevalInclude(include: Include): string;
export declare function unevalPage(page: Page): string;
export declare function unevalCategory(page: Category): string;
export declare function unevalTag(page: Tag): string;
export declare function loaderOf(path: string): string;
