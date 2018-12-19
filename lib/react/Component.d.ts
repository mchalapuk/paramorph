import * as React from 'react';
import { Context } from './Context';
export declare class Component<P, S> extends React.Component<P, S> {
    static readonly contextTypes: {
        paramorph: import("prop-types").Validator<import("prop-types").InferProps<{
            layouts: import("prop-types").Validator<object>;
            includes: import("prop-types").Validator<object>;
            pages: import("prop-types").Validator<object>;
            categories: import("prop-types").Validator<object>;
            tags: import("prop-types").Validator<object>;
        }>>;
        history: import("prop-types").Validator<import("prop-types").InferProps<{
            push: import("prop-types").Validator<(...args: any[]) => any>;
            replace: import("prop-types").Validator<(...args: any[]) => any>;
            listen: import("prop-types").Validator<(...args: any[]) => any>;
            location: import("prop-types").Validator<import("prop-types").InferProps<{
                pathname: import("prop-types").Validator<string>;
            }>>;
        }>>;
        page: import("prop-types").Validator<import("prop-types").InferProps<{
            url: import("prop-types").Validator<string>;
            title: import("prop-types").Validator<string>;
            description: import("prop-types").Validator<string>;
            image: import("prop-types").Requireable<string>;
            collection: import("prop-types").Validator<string>;
            layout: import("prop-types").Validator<string>;
            source: import("prop-types").Validator<string>;
            output: import("prop-types").Validator<boolean>;
            feed: import("prop-types").Validator<boolean>;
            categories: import("prop-types").Validator<any[]>;
            tags: import("prop-types").Validator<any[]>;
            timestamp: import("prop-types").Validator<number>;
        }>>;
    };
    context: Context;
}
export default Component;
