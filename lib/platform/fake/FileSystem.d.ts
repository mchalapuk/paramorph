import { FileSystem, Stats } from '../interface/FileSystem';
export declare class FakeFileSystem implements FileSystem {
    private files;
    private directories;
    readDir(path: string): Promise<string[]>;
    lstat(path: string): Promise<Stats>;
    writeFile(path: string, content: string): void;
    createDir(path: string): void;
}
export { FakeFileSystem as FileSystem };
export default FakeFileSystem;
export interface HashMap<T> {
    [key: string]: T | undefined;
}
