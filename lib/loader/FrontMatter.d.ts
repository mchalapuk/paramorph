import { SourceFile } from './ProjectStructure';
import { FileSystem } from '../platform/interface/FileSystem';
export declare class FrontMatter {
    private fs;
    constructor(fs: FileSystem);
    read(file: SourceFile): Promise<any>;
}
export default FrontMatter;
