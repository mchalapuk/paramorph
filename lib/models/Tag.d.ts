import Page, { ComponentType } from './Page';
import Layout from './Layout';
export default class Tag extends Page {
    originalTitle: string;
    pages: Page[];
    constructor(title: string, url: string, layout: Layout, body: ComponentType<any>);
}
