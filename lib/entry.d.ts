import 'source-map-support/register';
import { HashMap, Locals } from './renderers/server';
declare const serverRender: (locals: Locals) => Promise<HashMap<string>>;
export default serverRender;
