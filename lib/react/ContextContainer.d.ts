import * as React from 'react';
import { Context } from './Context';
export interface Props extends Context {
    children?: React.ReactNode;
}
export declare class ContextContainer extends React.Component<Props, {}> {
    static readonly childContextTypes: {
        paramorph: (object: any, key: string, componentName: string, ...rest: any[]) => Error | null;
        history: (object: any, key: string, componentName: string, ...rest: any[]) => Error | null;
        page: (object: any, key: string, componentName: string, ...rest: any[]) => Error | null;
    };
    getChildContext(): Context;
    render(): JSX.Element;
}
export default ContextContainer;
