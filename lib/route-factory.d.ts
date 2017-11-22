/// <reference types="react" />
import { ReactElement } from 'react';
import { RouteProps } from 'react-router-dom';
import { Website, Page } from './models';
export interface PageWithRoute {
    page: Page;
    route: ReactElement<RouteProps>;
}
export declare class RoutesFactory {
    getRoutes(website: Website): PageWithRoute[];
}
export default RoutesFactory;
