import { History } from 'history';
import { Paramorph, Page } from '../model';
export declare class LoaderRenderer {
    private history;
    private paramorph;
    constructor(history: History, paramorph: Paramorph);
    render(page: Page): string;
}
export default LoaderRenderer;
