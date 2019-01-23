
import { resolve } from 'path';

import { FileSystem } from '../../platform/interface/FileSystem';
import { Config } from '../../config';

export interface SpecialDirs {
  readonly layouts : SourceFile[];
  readonly includes : SourceFile[];
  readonly collections : HashMap<SourceFile[]>;
}

export interface SourceFile {
  readonly name : string;
  readonly path : string;
}

const LAYOUTS_DIR = '_layouts';
const INCLUDES_DIR = '_includes';
const ROOT_DIR = '.';

const JS_REGEX = /\.(t|j)sx?$/;
const MD_REGEX = /\.markdown$/;

const FORBIDDEN_NAMES = [
  'layouts',
  'includes',
  '$root',
];

export class ProjectStructure {
  constructor(private fs : FileSystem) {
  }

  async scan(config : Config) : Promise<SpecialDirs> {
    const collectionNames = Object.keys(config.collections);
    collectionNames.forEach(name => {
      if (FORBIDDEN_NAMES.indexOf(name) !== -1) {
        throw new Error(`collection name forbidden: '${name}'`);
      }
    });

    const specialDirs = {
      layouts: [] as SourceFile[],
      includes: [] as SourceFile[],
      collections: {} as HashMap<SourceFile[]>,
    };

    const underscoredFolders = (await this.fs.readDir('.'))
      .filter(async (path) => (await this.fs.lstat(`./${path}`)).isDirectory())
      .filter(path => path.match(/^_[a-z0-9-_]+$/))
    ;
    const requiredFolders = [ LAYOUTS_DIR, INCLUDES_DIR ];
    for (let i = 0; i < requiredFolders.length; ++i) {
      if (underscoredFolders.indexOf(requiredFolders[i]) === -1) {
        throw new Error(`couldn't find ./${requiredFolders[i]} folder`);
      }
    }
    const collectionFolders = underscoredFolders
      .filter(folder => requiredFolders.indexOf(folder) === -1);

    await this.scanDir(`./${LAYOUTS_DIR}`, JS_REGEX)
      .then(sourceFiles => specialDirs.layouts = sourceFiles);
    await this.scanDir(`./${INCLUDES_DIR}`, JS_REGEX)
      .then(sourceFiles => specialDirs.includes = sourceFiles);
    await this.scanDir(ROOT_DIR, MD_REGEX, false)
      .then(sourceFiles => specialDirs.collections['$root'] = sourceFiles);

    for (let i = 0; i < collectionNames.length; ++i) {
      const name = collectionNames[i];
      const folder = `_${name}`;
      if (underscoredFolders.indexOf(folder) === -1) {
        console.warn(`couldn't find folder ${folder} required by collection ${name}`);
        break;
      }
      await this.scanDir(`./${folder}`, MD_REGEX)
        .then(sourceFiles => specialDirs.collections[name] = sourceFiles);
    }

    return specialDirs;
  }

  private async scanDir(
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

export default ProjectStructure;

export interface HashMap<T> {
  [name : string] : T | undefined;
}

function removeExtension(name : string) {
  const dotIndex = name.indexOf('.');
  return dotIndex !== -1 ? name.substring(0, dotIndex) : name;
}

