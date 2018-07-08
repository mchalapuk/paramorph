import { History } from 'history';
import { Paramorph, Page } from '../model';
export declare class LoaderRenderer {
    private history;
    private paramorph;
    private loadSource;
    constructor(history: History, paramorph: Paramorph, loadSource: (request: string) => Promise<string>);
    render(page: Page): Promise<string>;
    private loadComponent;
    private eval;
}
export default LoaderRenderer;
