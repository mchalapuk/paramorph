import * as React from 'react';
import { Context } from 'paramorph';
export interface Props {
    children: React.ReactNode;
}
export declare class MarkdownPage extends React.Component<Props, {}> {
    static readonly contextTypes: {
        paramorph: (object: any, key: string, componentName: string, ...rest: any[]) => Error | null;
        history: (object: any, key: string, componentName: string, ...rest: any[]) => Error | null;
        page: (object: any, key: string, componentName: string, ...rest: any[]) => Error | null;
    };
    context: Context;
    render(): JSX.Element;
}
export default MarkdownPage;
