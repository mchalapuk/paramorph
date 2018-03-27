import { Page } from '.';
export declare class Tag extends Page {
    readonly originalTitle: string;
    readonly pages: Page[];
    constructor(title: string, description: string, image: string | null, layout: string, source: string, output: boolean, timestamp: number);
}
export default Tag;
