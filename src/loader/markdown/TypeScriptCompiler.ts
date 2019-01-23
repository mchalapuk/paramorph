
import * as ts from 'typescript';

export class TypeScriptCompiler {
  compile(source : string, fileName : string) : string {
    const output = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        allowJs: true,
        alwaysStrict: true,
        jsx: ts.JsxEmit.React,
        target: ts.ScriptTarget.ES5,
      },
      reportDiagnostics: true,
      fileName,
    });

    if (output.diagnostics && output.diagnostics.length !== 0) {
      const errors = output.diagnostics.map(diagnostic => {
        if (!diagnostic.file) {
          return `${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`;
        }
        const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        return `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`;
      });
      throw new Error(errors.join('\n'));
    }

    return output.outputText;
  }
}

export default TypeScriptCompiler;

