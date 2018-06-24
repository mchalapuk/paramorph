/// <reference types="react" />
import { ComponentType } from 'react';
import { Route } from '../router';
import { RootProps } from '../components/Root';
import { Paramorph } from '../model';
export interface Locals {
    Root?: ComponentType<RootProps>;
    path: string;
    js?: string[];
    css?: string[];
    assets: HashMap<string>;
    webpackStats: {
        compilation: {
            assets: HashMap<any>;
        };
    };
}
export declare class ServerRenderer {
    private Root;
    constructor(Root: ComponentType<RootProps>);
    render(locals: Locals, paramorph: Paramorph, routes: Route[]): Promise<HashMap<string>>;
}
export default ServerRenderer;
export interface HashMap<T> {
    [name: string]: T | undefined;
}
