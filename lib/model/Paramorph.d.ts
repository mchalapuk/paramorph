import { Config } from '../config';
import { Page, Layout } from '.';
export declare class Paramorph {
    readonly config: Config;
    readonly layouts: HashMap<Layout>;
    readonly pages: HashMap<Page>;
    constructor(config: Config);
    addLayout(layout: Layout): void;
    addPage(page: Page): void;
}
export default Paramorph;
export interface HashMap<T> {
    [key: string]: T | undefined;
}
