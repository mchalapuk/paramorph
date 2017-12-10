/// <reference types="react" />
import { ReactNode } from 'react';
export interface Props {
    children: ReactNode;
    limit?: number;
    respectLimit?: boolean;
}
export declare function ContentLimiter({children, limit, respectLimit, ...props}: Props): JSX.Element;
export default ContentLimiter;
