import { Config } from '../config';
import { Page } from '.';
export declare class Paramorph {
    readonly config: Config;
    readonly pages: HashMap<Page>;
    constructor(config: Config);
    addPage(url: string, page: Page): void;
}
export default Paramorph;
export interface HashMap<T> {
    [key: string]: T | undefined;
}
