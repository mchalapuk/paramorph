/// <reference types="react" />
import { Page } from '../models';
export interface BundleUrls {
    css: string[];
    js: string[];
}
export interface RootProps {
    page: Page;
    localBundles: BundleUrls;
    externalBundles: BundleUrls;
}
export declare function Root({page, localBundles, externalBundles}: RootProps): JSX.Element;
export default Root;
