import { readdirSync, lstatSync } from 'fs';

export const specialDirs = readdirSync('.')
  .filter((file : string) => lstatSync(file).isDirectory())
  .filter((file : string) => file.match(/^_[a-z0-9-_]+$/))
  .filter((file : string) => ['_layouts', '_includes', '_output'].indexOf(file) == -1)
;

export default specialDirs;

