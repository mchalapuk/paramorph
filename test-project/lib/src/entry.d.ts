import { HashMap, Locals } from './renderers/server';
declare const serverRender: (locals: Locals) => HashMap<string>;
export default serverRender;
