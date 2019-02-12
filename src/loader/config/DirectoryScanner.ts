
import FileSystem from '../../platform/interface/FileSystem';

import SourceFile from './SourceFile';

export class DirectoryScanner {
  constructor(
    private readonly fs : FileSystem,
  ) {
  }

  async scanDir(
    path : string,
    fileRegex : RegExp,
    subdirs : boolean = true,
  ) : Promise<SourceFile[]> {

    const result = [] as SourceFile[];
    const rawContents = (await this.fs.readDir(path)).sort();

    for (const name of rawContents) {
      const subPath = `${path}/${name}`;
      const stat = await this.fs.lstat(subPath);

      if (subdirs && stat.isDirectory()) {
        const subContents = (await this.fs.readDir(subPath))
          .filter(subName => subName.match(fileRegex))
          .filter(subName => subName.startsWith('index.') && !subName.substring(6).match(fileRegex))
          .sort()
        ;
        if (subContents.length === 0) {
          continue;
        }
        if (subContents.length > 1) {
          throw new Error(`multiple index files found in subfolder: ${subPath}: ${subContents}`);
        }
        const subName = subContents[0];
        const subSubPath = `${subPath}/${subName}`;
        const subStat = await this.fs.lstat(subSubPath);

        if (!subStat.isDirectory()) {
          result.push({ name, path: subSubPath });
        }
      } else if (name.match(fileRegex)) {
        result.push({ name : removeExtension(name), path: subPath });
      }
    }

    return result;
  }
}

export default DirectoryScanner;

function removeExtension(name : string) {
  const dotIndex = name.indexOf('.');
  return dotIndex !== -1 ? name.substring(0, dotIndex) : name;
}

