/// <reference types="react" />
import { ComponentClass, StatelessComponent } from 'react';
import Layout from './Layout';
import Website from './Website';
export declare type ComponentType<T> = ComponentClass<T> | StatelessComponent<T>;
export declare class Page {
    title: string;
    description: string;
    url: string;
    layout: Layout;
    body: any;
    output: boolean;
    date: Date;
    categories: string[];
    tags: string[];
    feed: boolean;
    constructor(title: string, description: string, url: string, layout: Layout, body: ComponentType<any>, output: boolean, date: Date, categories: string[], tags: string[], feed: boolean);
    getCrumbs(website: Website): Page[][];
    compareTo(another: Page): -1 | 1;
}
export default Page;
