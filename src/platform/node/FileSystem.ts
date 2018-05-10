import { promisify } from 'util';
import { readdir, lstat, open, read } from 'fs';

import { FileSystem, Stats } from '../interface/FileSystem';

const asyncReadDir = promisify(readdir);
const asyncLstat = promisify(lstat);
const asyncOpen = promisify(open);
const asyncRead = promisify(read);

export class NodeFileSystem implements FileSystem {
  readDir(path : string) : Promise<string[]> {
    return asyncReadDir(path);
  }
  lstat(path : string) : Promise<Stats> {
    return asyncLstat(path);
  }
  async read(path : string, maxLength : number) : Promise<string> {
    const buffer = Buffer.alloc(maxLength);
    const fd = await asyncOpen(path, 'r');
    const result = await asyncRead(fd, buffer, 0, maxLength, 0);

    return buffer
      .slice(0, result.bytesRead)
      .toString('utf-8')
    ;
  }
}

export { NodeFileSystem as FileSystem };
export default NodeFileSystem;

