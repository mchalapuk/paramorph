export interface Module {
    name: string;
    exports: any;
}
export interface RequireContext {
    keys(): string[];
    <T>(id: string): T;
    resolve(id: string): string;
}
declare function requireDirectory(context: RequireContext): Module[];
export default requireDirectory;
