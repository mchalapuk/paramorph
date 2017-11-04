import Layout from './Layout';
import Include from './Include';
import Page from './Page';
import Category from './Category';
import Tag from './Tag';
import Collection from './Collection';
import MenuEntry from './MenuEntry';
export interface HashTable<T> {
    [key: string]: T;
}
export default class Website {
    title: string;
    baseUrl: string;
    timezone: string;
    layouts: HashTable<Layout>;
    includes: HashTable<Include>;
    collections: HashTable<Collection>;
    categories: HashTable<Category>;
    tags: HashTable<Tag>;
    pages: HashTable<Page>;
    entities: HashTable<Page>;
    menu: MenuEntry[];
    addLayout(layout: Layout): void;
    getLayoutOfName(name: string, requiredBy: string): Layout;
    addInclude(include: Include): void;
    getIncludeOfName(name: string, requiredBy?: string): Include;
    addCollection(collection: Collection): void;
    getCollectionOfTitle(title: string, requiredBy: string): Collection;
    addPage(page: Page): void;
    getPageOfUrl(url: string, requiredBy?: string): Page;
    addCategory(category: Category): void;
    getCategoryOfTitle(title: string, requiredBy?: string): Category;
    addTag(tag: Tag): void;
    getTagOfTitle(title: string, requiredBy?: string): Tag;
    private addEntity(page);
    getEntityOfUrl(url: string, requiredBy?: string): Page;
    menuContains(page: Page): boolean;
    getMenuEntry(page: Page, requiredBy?: string): MenuEntry;
}
