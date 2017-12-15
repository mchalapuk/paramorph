/// <reference types="react" />
import { ComponentType } from 'react';
import { PageWithRoute } from '../route-factory';
import { RootProps } from '../components/Root';
import { Website } from '../models';
export interface Locals {
    path: string;
    js?: string[];
    css?: string[];
    meta?: any[];
    assets: HashMap<string>;
    webpackStats: WebpackStats;
}
export interface WebpackStats {
    compilation: CompilationStats;
}
export interface CompilationStats {
    assets: HashMap<any>;
}
export interface HashMap<T> {
    [name: string]: T;
}
export declare class ServerRenderer {
    private Root;
    constructor(Root: ComponentType<RootProps>);
    render(locals: Locals, website: Website, routes: PageWithRoute[]): HashMap<string>;
}
export default ServerRenderer;
