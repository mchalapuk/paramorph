import { Config } from '../config';
import { Layout, Include, Page, Category, ComponentType } from '.';
export declare class Paramorph {
    readonly config: Config;
    readonly layouts: HashMap<Layout>;
    readonly includes: HashMap<Include>;
    readonly pages: HashMap<Page>;
    readonly categories: HashMap<Category>;
    readonly tags: HashMap<Category>;
    readonly layoutLoaders: HashMap<Promise<ComponentType>>;
    readonly includeLoaders: HashMap<Promise<ComponentType>>;
    readonly pageLoaders: HashMap<Promise<ComponentType>>;
    constructor(config: Config);
    addLayout(layout: Layout): void;
    addInclude(include: Include): void;
    addPage(page: Page): void;
    addLayoutLoader(name: string, loader: Promise<ComponentType>): void;
    loadLayout(name: string): Promise<ComponentType>;
    addIncludeLoader(name: string, loader: Promise<ComponentType>): void;
    loadInclude(name: string): Promise<ComponentType>;
    addPageLoader(url: string, loader: Promise<ComponentType>): void;
    loadPage(url: string): Promise<ComponentType>;
}
export default Paramorph;
export interface HashMap<T> {
    [key: string]: T | undefined;
}
