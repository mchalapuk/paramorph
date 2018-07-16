import * as React from 'react';
import { Context } from './Context';
export declare class Component<P, S> extends React.Component<P, S> {
    static readonly contextTypes: {
        paramorph: (object: any, key: string, componentName: string, ...rest: any[]) => Error | null;
        history: (object: any, key: string, componentName: string, ...rest: any[]) => Error | null;
        page: (object: any, key: string, componentName: string, ...rest: any[]) => Error | null;
    };
    context: Context;
}
export default Component;
