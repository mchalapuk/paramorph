/// <reference types="react" />
import * as React from 'react';
import { History } from 'history';
import { Paramorph, Page } from '../model';
export interface Props {
    paramorph: Paramorph;
    history: History;
    page: Page;
}
export declare class ContextContainer extends React.Component<Props, {}> {
    static readonly contextTypes: {
        paramorph: (object: any, key: string, componentName: string, ...rest: any[]) => Error | null;
        history: (object: any, key: string, componentName: string, ...rest: any[]) => Error | null;
        page: (object: any, key: string, componentName: string, ...rest: any[]) => Error | null;
    };
    getChildContext(): {
        paramorph: Paramorph;
        page: Page;
        history: History;
    };
    render(): JSX.Element;
}
export default ContextContainer;
