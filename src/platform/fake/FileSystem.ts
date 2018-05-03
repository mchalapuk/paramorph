
import { FileSystem, Stats } from '../interface/FileSystem';

export class FakeFileSystem implements FileSystem {
  private files = {} as HashMap<string>;
  private directories = [] as string[];

  readDir(path : string) : Promise<string[]> {
    if (this.directories.indexOf(path) === -1) {
      return Promise.reject(new Error(`no such file or directory: ${path}`));
    }
    const normalized = path.endsWith('/') ? path : `${path}/`;
    const contentFiles = Object.keys(this.files)
      .filter(f => f.match(new RegExp(`^${normalized}[^/]+$`)));
    const contentDirs = this.directories
      .filter(d => d.match(new RegExp(`^${normalized}[^/]+$`)));
    const result = contentFiles.concat(contentDirs)
      .map(p => p.substring(normalized.length));
    return Promise.resolve(result);
  }
  lstat(path : string) : Promise<Stats> {
    if (this.directories.indexOf(path) !== -1) {
      return Promise.resolve({
        isDirectory: () => true,
      });
    }
    if (this.files.hasOwnProperty(path)) {
      return Promise.resolve({
        isDirectory: () => false,
      });
    }
    return Promise.reject(new Error(`no such file or directory: ${path}`));
  }
  read(path : string, bytes : number) : Promise<string> {
    const content = this.files[path];
    if (content === undefined) {
      throw new Error(`no such file: ${path}`);
    }
    return Promise.resolve(content.substring(0, bytes));
  }

  writeFile(path : string, content : string) {
    this.files[path] = content;
  }
  createDir(path : string) {
    this.directories.push(path);
  }
}

export { FakeFileSystem as FileSystem };
export default FakeFileSystem;

export interface HashMap<T> {
  [key : string] : T | undefined;
}

