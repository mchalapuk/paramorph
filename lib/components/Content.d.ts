/// <reference types="react" />
import { Component, ReactNode } from 'react';
import NodeMapper from './NodeMapper';
export interface Props {
    children: ReactNode;
    map?: NodeMapper;
    limit?: number;
    respectLimit?: boolean;
}
export declare class Content extends Component<Props, {}> {
    private outstandingLimit;
    render(): JSX.Element;
    private renderChildren(children);
    private renderNode(node, key);
    private renderString(child);
    private renderComponent(elem, key);
    private isLimitReached();
}
export default Content;
