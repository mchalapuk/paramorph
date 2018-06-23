import { Route } from 'universal-router';
import { Paramorph, Page } from './model';
export interface PageWithRoute {
    page: Page;
    route: Route;
}
export declare class RoutesFactory {
    getRoutes(paramorph: Paramorph): PageWithRoute[];
}
export default RoutesFactory;
