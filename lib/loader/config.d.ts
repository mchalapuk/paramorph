import 'source-map-support/register';
export declare type Callback = (error: any | null, source?: string, map?: any, meta?: any) => void;
export interface WebpackLoader {
    async(): Callback;
    loadModule(request: string, callback: (err: any, source: string) => void): void;
}
