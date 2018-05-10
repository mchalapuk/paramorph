
export interface FileSystem {
  readDir(path : string) : Promise<string[]>;
  lstat(path : string) : Promise<Stats>;
  read(path : string, maxLength : number) : Promise<string>;
}

export interface Stats {
  isDirectory() : boolean;
}

export default FileSystem;

