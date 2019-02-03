
import * as should from 'should';

import TypeScriptCompiler from './TypeScriptCompiler';

const MODULE_HEADER = '"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\n';

describe('markdown/TypeScriptCompiler', () => {
  let testedCompiler : TypeScriptCompiler;

  beforeEach(() => {
    testedCompiler = new TypeScriptCompiler();
  });

  it('throws Error when compiling code with syntax error', () => {
    try {
      testedCompiler.compile('>', 'test.md');
    } catch (e) {
      e.message.should.equal(`
TSError: test.md.tsx (1,1):

 1  >
    ⬆
   Expression expected.

TSError: test.md.tsx (1,2):

 1  >
     ⬆
   Expression expected.`);
    }
  });

  it('transpiles valid typescript', () => {
    const compiled = testedCompiler.compile('export const a : string = "b";', 'test.md');
    compiled.should.equal(`${MODULE_HEADER}exports.a = "b";\n`);
  });

  it('transpiles jsx', () => {
    const compiled = testedCompiler.compile('export const a = (<div></div>);', 'test.md');
    compiled.should.equal(`${MODULE_HEADER}exports.a = (React.createElement("div", null));\n`);
  });
});

