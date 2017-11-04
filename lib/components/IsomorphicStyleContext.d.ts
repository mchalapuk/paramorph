/// <reference types="react" />
import * as React from 'react';
import { Component, ReactNode } from 'react';
import * as PropTypes from 'prop-types';
export interface Props {
    children: ReactNode;
}
export declare class IsomorphicStyleContext extends Component<Props, {}> {
    static readonly childContextTypes: {
        insertCss: PropTypes.Validator<any>;
    };
    getChildContext(): {
        insertCss: (...styles: {
            _insertCss: () => () => void;
        }[]) => () => void;
    };
    render(): React.ReactElement<any>;
}
export default IsomorphicStyleContext;
