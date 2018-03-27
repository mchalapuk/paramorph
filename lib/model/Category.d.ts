import { Page } from '.';
export declare class Category extends Page {
    readonly pages: Page[];
    constructor(url: string, title: string, description: string, image: string | null, layout: string, source: string, output: boolean, feed: boolean, categories: string[], tags: string[], timestamp: number);
}
export default Category;
