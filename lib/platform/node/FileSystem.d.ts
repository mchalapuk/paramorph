import { FileSystem, Stats } from '../interface/FileSystem';
export declare class NodeFileSystem implements FileSystem {
    readDir(path: string): Promise<string[]>;
    lstat(path: string): Promise<Stats>;
}
export { NodeFileSystem as FileSystem };
export default NodeFileSystem;
