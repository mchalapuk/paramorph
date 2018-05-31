export declare class Page {
    readonly url: string;
    readonly title: string;
    readonly description: string;
    readonly image: string | null;
    readonly collection: string;
    readonly layout: string;
    readonly source: string;
    readonly output: boolean;
    readonly feed: boolean;
    readonly categories: string[];
    readonly tags: string[];
    readonly timestamp: number;
    constructor(url: string, title: string, description: string, image: string | null, collection: string, layout: string, source: string, output: boolean, feed: boolean, categories: string[], tags: string[], timestamp: number);
    compareTo(another: Page): -1 | 1;
}
