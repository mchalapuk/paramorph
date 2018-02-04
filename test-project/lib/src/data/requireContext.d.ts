declare const fs: any;
declare const path: any;
declare const specialDirs: any;
declare const JS_REGEX = "/\\.(t|j)sx?$/";
declare const MD_REGEX = "/\\.markdown$/";
declare const code: string;
interface Entry {
    name: string;
    path: string;
    regex: RegExp;
    subdirs: boolean;
}
