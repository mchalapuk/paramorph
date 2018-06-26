/// <reference types="react" />
import { ComponentType } from 'react';
import { UniversalRouter, Context } from '../router';
import { History } from 'history';
import { Paramorph } from '../model';
export declare class ClientRenderer {
    private history;
    private router;
    private paramorph;
    constructor(history: History, router: UniversalRouter<Context, ComponentType<any>>, paramorph: Paramorph);
    render(containerId: string): void;
}
export default ClientRenderer;
