import { Config } from '../config';
import { Layout, Include, Page, Category, ComponentType } from '.';
export declare type Loader = () => Promise<ComponentType>;
export declare class Paramorph {
    readonly config: Config;
    readonly layouts: HashMap<Layout>;
    readonly includes: HashMap<Include>;
    readonly pages: HashMap<Page>;
    readonly categories: HashMap<Category>;
    readonly tags: HashMap<Category>;
    readonly layoutLoaders: HashMap<Loader>;
    readonly includeLoaders: HashMap<Loader>;
    readonly pageLoaders: HashMap<Loader>;
    constructor(config: Config);
    addLayout(layout: Layout): void;
    addInclude(include: Include): void;
    addPage(page: Page): void;
    addLayoutLoader(name: string, loader: Loader): void;
    loadLayout(name: string): Promise<ComponentType>;
    addIncludeLoader(name: string, loader: Loader): void;
    loadInclude(name: string): Promise<ComponentType>;
    addPageLoader(url: string, loader: Loader): void;
    loadPage(url: string): Promise<ComponentType>;
}
export default Paramorph;
export interface HashMap<T> {
    [key: string]: T | undefined;
}
