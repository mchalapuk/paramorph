/// <reference types="react" />
export interface Props {
    title: string;
    path: string;
    tags: string[];
    description: string;
    css: string[];
    bundles: string[];
    externalScripts: string[];
    externalStylesheets: string[];
}
export declare function Root({title, path, tags, description, css, bundles, externalScripts, externalStylesheets}: Props): JSX.Element;
export default Root;
