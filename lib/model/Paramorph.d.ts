import { Config } from '../config';
import { Page, Layout, Include } from '.';
export declare class Paramorph {
    readonly config: Config;
    readonly layouts: HashMap<Layout>;
    readonly includes: HashMap<Include>;
    readonly pages: HashMap<Page>;
    constructor(config: Config);
    addLayout(layout: Layout): void;
    addInclude(include: Include): void;
    addPage(page: Page): void;
}
export default Paramorph;
export interface HashMap<T> {
    [key: string]: T | undefined;
}
