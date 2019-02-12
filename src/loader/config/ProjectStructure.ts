
import { resolve } from 'path';

import { FileSystem } from '../../platform/interface/FileSystem';
import { Config } from '../../model';

import DirectoryScanner from './DirectoryScanner';
import SourceDirectory from './SourceDirectory';
import SourceFile from './SourceFile';

export interface SpecialDirs {
  readonly layouts : SourceFile[];
  readonly includes : SourceFile[];
  readonly collections : SourceDirectory[];
}

export const LAYOUTS_DIR = '_layouts';
export const INCLUDES_DIR = '_includes';
export const ROOT_DIR = '.';

export const JS_REGEX = /\.(t|j)sx?$/;
export const MD_REGEX = /\.markdown$/;

const FORBIDDEN_NAMES = [
  'layouts',
  'includes',
  '$root',
];

export class ProjectStructure {
  private readonly scanner : DirectoryScanner;

  constructor(
    private readonly fs : FileSystem,
  ) {
    this.scanner = new DirectoryScanner(fs);
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
      collections: [] as SourceDirectory[],
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

    await this.scanner.scanDir(`./${LAYOUTS_DIR}`, JS_REGEX)
      .then(files => specialDirs.layouts = files);
    await this.scanner.scanDir(`./${INCLUDES_DIR}`, JS_REGEX)
      .then(files => specialDirs.includes = files);
    await this.scanner.scanDir(ROOT_DIR, MD_REGEX, false)
      .then(files => specialDirs.collections.push({ name: '$root', path: '.', files }));

    for (let i = 0; i < collectionNames.length; ++i) {
      const name = collectionNames[i];
      const folder = `_${name}`;
      if (underscoredFolders.indexOf(folder) === -1) {
        console.warn(`couldn't find folder ${folder} required by collection ${name}`);
        break;
      }
      const path = `./${folder}`;
      await this.scanner.scanDir(path, MD_REGEX)
        .then(files => specialDirs.collections.push({ name, path, files }));
    }

    return specialDirs;
  }

}

export default ProjectStructure;

export interface HashMap<T> {
  [name : string] : T | undefined;
}

