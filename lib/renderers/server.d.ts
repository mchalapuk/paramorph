import { ComponentType } from 'react';
import { UniversalRouter, Context } from '../router';
import { History } from 'history';
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
    private history;
    private router;
    private paramorph;
    constructor(history: History, router: UniversalRouter<Context, ComponentType<any>>, paramorph: Paramorph);
    render(locals: Locals): Promise<HashMap<string>>;
}
export default ServerRenderer;
export interface HashMap<T> {
    [name: string]: T | undefined;
}
