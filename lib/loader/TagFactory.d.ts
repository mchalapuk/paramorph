import { Page, Tag } from '../model';
export declare class TagFactory {
    private tagPage;
    constructor(tagPage: Page);
    create(title: string): Tag;
}
export default TagFactory;
