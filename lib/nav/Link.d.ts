import * as React from 'react';
import { PureComponent } from '../react';
export declare type ClickEvent = React.MouseEvent<HTMLAnchorElement>;
export declare type ClickCallback = (event: ClickEvent) => boolean | void;
export interface Props {
    to: string;
    children: React.ReactNode;
    onClick?: ClickCallback;
}
export declare class Link extends PureComponent<Props, {}> {
    render(): JSX.Element;
}
export default Link;
