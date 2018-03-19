import { promisify } from 'util';
import { readdir, lstat } from 'fs';

import { FileSystem, Stats } from '../interface/FileSystem';

const asyncReadDir = promisify(readdir);
const asyncLstat = promisify(lstat);

export class NodeFileSystem implements FileSystem {
  readDir(path : string) : Promise<string[]> {
    return asyncReadDir(path);
  }
  lstat(path : string) : Promise<Stats> {
    return asyncLstat(path);
  }
}

export { NodeFileSystem as FileSystem };
export default NodeFileSystem;

