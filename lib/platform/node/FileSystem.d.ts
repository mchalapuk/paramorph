import { FileSystem, Stats } from '../interface/FileSystem';
export declare class NodeFileSystem implements FileSystem {
    readDir(path: string): Promise<string[]>;
    lstat(path: string): Promise<Stats>;
    read(path: string, maxLength: number): Promise<string>;
}
export { NodeFileSystem as FileSystem };
export default NodeFileSystem;
