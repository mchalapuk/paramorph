import { HashMap, Locals } from './renderers/server';
declare type WebpackStats = {
    compilation: {
        assets: HashMap<any>;
    };
};
declare const serverRender: (locals: Locals, stats: WebpackStats) => Promise<HashMap<string>>;
export default serverRender;
