import { Config } from '../config';
import { Paramorph } from '../model';
import { ProjectStructure } from './ProjectStructure';
import { FrontMatter } from './FrontMatter';
import { PageFactory } from './PageFactory';
export declare class Loader {
    private structure;
    private frontMatter;
    private pageFactory;
    constructor(structure: ProjectStructure, frontMatter: FrontMatter, pageFactory: PageFactory);
    load(config: Config): Promise<Paramorph>;
}
export default Loader;
