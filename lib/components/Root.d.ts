/// <reference types="react" />
import { Paramorph, Page } from '../model';
export interface BundleUrls {
    css: string[];
    js: string[];
}
export interface RootProps {
    paramorph: Paramorph;
    page: Page;
    localBundles: BundleUrls;
    externalBundles: BundleUrls;
}
export declare function Root({paramorph, page, localBundles, externalBundles}: RootProps): JSX.Element;
export default Root;
