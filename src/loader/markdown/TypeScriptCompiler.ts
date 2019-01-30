
import * as ts from 'typescript';

const COMPILER_OPTIONS = {
  module: ts.ModuleKind.CommonJS,
  allowJs: true,
  alwaysStrict: true,
  jsx: ts.JsxEmit.React,
  target: ts.ScriptTarget.ES5,
};

/**
 * @author Maciej Chałapuk (maciej@chalapuk.pl)
 */
export class TypeScriptCompiler {
  compile(source : string, fileName : string) : string {
    const output = ts.transpileModule(source, {
      compilerOptions: COMPILER_OPTIONS,
      reportDiagnostics: true,
      fileName,
    });

    const { diagnostics } = output;
    if (diagnostics && diagnostics.length !== 0) {
      throw toError(diagnostics);
    }
    return output.outputText;
  }
}

export default TypeScriptCompiler;

function toError(diagnostics : ts.Diagnostic[]) {
  const errors = diagnostics.map(diagnostic => {
    if (!diagnostic.file) {
      return `${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`;
    }
    const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    return `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`;
  });

  return new Error(errors.join('\n'));
}

