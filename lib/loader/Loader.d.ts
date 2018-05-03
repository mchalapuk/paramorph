import { Config } from '../config';
import { Paramorph } from '../model';
import { ProjectStructure } from './ProjectStructure';
export declare class Loader {
    private structure;
    constructor(structure: ProjectStructure);
    load(config: Config): Promise<Paramorph>;
}
export default Loader;
