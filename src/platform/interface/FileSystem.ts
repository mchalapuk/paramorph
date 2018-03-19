
export interface FileSystem {
  readDir(path : string) : Promise<string[]>;
  lstat(path : string) : Promise<Stats>;
}

export interface Stats {
  isDirectory() : boolean;
}

export default FileSystem;

