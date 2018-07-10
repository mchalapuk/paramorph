export declare type Callback = (error: any | null, source?: string, map?: any, meta?: any) => void;
export interface WebpackLoader {
    async(): Callback;
}
