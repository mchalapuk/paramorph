import { FileSystem } from '../platform/interface/FileSystem';
import { Config } from '../config';
export interface SpecialDirs {
    readonly layouts: SourceFile[];
    readonly includes: SourceFile[];
    readonly collections: HashMap<SourceFile[]>;
}
export interface SourceFile {
    readonly name: string;
    readonly path: string;
}
export declare class ProjectStructure {
    private fs;
    constructor(fs: FileSystem);
    scan(config: Config): Promise<SpecialDirs>;
    scanDir(path: string, fileRegex: RegExp, subdirs?: boolean): Promise<SourceFile[]>;
}
export interface HashMap<T> {
    [name: string]: T | undefined;
}
