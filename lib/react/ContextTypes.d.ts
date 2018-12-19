import * as PropTypes from 'prop-types';
export declare const ContextTypes: {
    paramorph: PropTypes.Validator<PropTypes.InferProps<{
        layouts: PropTypes.Validator<object>;
        includes: PropTypes.Validator<object>;
        pages: PropTypes.Validator<object>;
        categories: PropTypes.Validator<object>;
        tags: PropTypes.Validator<object>;
    }>>;
    history: PropTypes.Validator<PropTypes.InferProps<{
        push: PropTypes.Validator<(...args: any[]) => any>;
        replace: PropTypes.Validator<(...args: any[]) => any>;
        listen: PropTypes.Validator<(...args: any[]) => any>;
        location: PropTypes.Validator<PropTypes.InferProps<{
            pathname: PropTypes.Validator<string>;
        }>>;
    }>>;
    page: PropTypes.Validator<PropTypes.InferProps<{
        url: PropTypes.Validator<string>;
        title: PropTypes.Validator<string>;
        description: PropTypes.Validator<string>;
        image: PropTypes.Requireable<string>;
        collection: PropTypes.Validator<string>;
        layout: PropTypes.Validator<string>;
        source: PropTypes.Validator<string>;
        output: PropTypes.Validator<boolean>;
        feed: PropTypes.Validator<boolean>;
        categories: PropTypes.Validator<any[]>;
        tags: PropTypes.Validator<any[]>;
        timestamp: PropTypes.Validator<number>;
    }>>;
};
export default ContextTypes;
