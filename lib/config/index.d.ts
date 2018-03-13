export interface Config {
    title: string;
    timezone: string;
    collections: HashMap<CollectionConfig>;
    baseUrl: string;
    image: string;
    locale: string;
    menu: MenuEntryConfig[];
}
export interface CollectionConfig {
    title?: string;
    layout?: string;
    output?: boolean;
}
export interface MenuEntryConfig {
    title: string;
    short: string;
    url: string;
    icon: string;
}
/**
 * Parses _config.yml, validates its content and returns as instance of Config.
 *
 * @author Maciej Chałapuk
 */
export declare function parse(yaml: string): Config;
export interface HashMap<T> {
    [name: string]: T | undefined;
}
