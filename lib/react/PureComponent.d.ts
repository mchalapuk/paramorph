import * as React from 'react';
import { Context } from './Context';
export declare class PureComponent<P, S> extends React.PureComponent<P, S> {
    static readonly contextTypes: {
        paramorph: (object: any, key: string, componentName: string, ...rest: any[]) => Error | null;
        history: (object: any, key: string, componentName: string, ...rest: any[]) => Error | null;
        page: (object: any, key: string, componentName: string, ...rest: any[]) => Error | null;
    };
    context: Context;
}
export default PureComponent;
