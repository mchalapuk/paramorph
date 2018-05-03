import { Config } from '../config';
import { Paramorph } from '../model';
import { ProjectStructure } from './ProjectStructure';
import { FrontMatter } from './FrontMatter';
export declare class Loader {
    private structure;
    private frontMatter;
    constructor(structure: ProjectStructure, frontMatter: FrontMatter);
    load(config: Config): Promise<Paramorph>;
    private addCollection(paramorph, name, collection);
    private createPage(file, metaData);
}
export default Loader;
