
export interface Module {
  name : string;
  exports : any;
}

export interface RequireContext {
  keys(): string[];
  <T>(id: string): T;
  resolve(id: string): string;
}

function requireDirectory(context : RequireContext) : Module[] {
  return context.keys()
    .map((name : string) => ({
      exports: context(name) as any,
      name: name,
    }));
}

export default requireDirectory;

