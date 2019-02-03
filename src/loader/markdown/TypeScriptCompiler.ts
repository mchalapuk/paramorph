
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
      throw toError(source, diagnostics);
    }
    return output.outputText;
  }
}

export default TypeScriptCompiler;

function toError(source : string, diagnostics : ts.Diagnostic[]) {
  const lines = source.split('\n');

  const errors = diagnostics.map(diagnostic => {
    if (!diagnostic.file) {
      return `${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`;
    }
    const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

    const arrow = renderArrow(character);

    return `
TSError: ${diagnostic.file.fileName} (${line + 1},${character + 1}):

 ${line + 1}  ${lines[line]}
 ${`${line + 1}`.replace(/./g, ' ')}  ${arrow}
 ${`${line + 1}`.replace(/./g, ' ')} ${message}`;
  });

  return new Error(errors.join('\n'));
}

function renderArrow(character : number) {
  const builder : string[] = [];
  for (let i = 0; i < Math.floor(character / 10); ++i) {
    builder.push('          ');
  }
  builder.push('          '.substring(0, character % 10));
  return `${builder.join('')}⬆`;
}

