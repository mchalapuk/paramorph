import { Component, ReactNode } from 'react';
import NodeMapper from './NodeMapper';
export interface Props {
    children: ReactNode;
    mapper?: NodeMapper;
    limit?: number;
    respectLimit?: boolean;
}
export declare class Content extends Component<Props, {}> {
    private outstandingLimit;
    render(): JSX.Element;
    private renderChildren;
    private renderNode;
    private renderString;
    private renderComponent;
    private isLimitReached;
}
export default Content;
