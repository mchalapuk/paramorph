/// <reference types="react" />
import { ComponentType } from 'react';
import { PageWithRoute } from '../route-factory';
import { RootProps } from '../components/Root';
export interface HashMap<T> {
    [name: string]: T;
}
export interface Locals {
    title: string;
    path: string;
    js: string[];
    css: string[];
    assets: HashMap<{}>;
}
export declare class ServerRenderer {
    private Root;
    constructor(Root: ComponentType<RootProps>);
    render(locals: Locals, routes: PageWithRoute[]): HashMap<string>;
}
export default ServerRenderer;
