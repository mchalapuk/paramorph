
import * as ts from 'typescript';
import * as webpack from 'webpack';

import { getOptions } from 'loader-utils';
const Markdown = require('markdown-it');

const { readFileSync } = require('fs');
const path = require('path');

const template = loadTemplate();

const DELIMITER = '---\n';
const MAX_FM_SIZE = 2048;
const CHILDREN_PLACEHOLDER = '{ PLACEHOLDER }';

export function MarkdownLoader(this : webpack.loader.Loader, source : string) {
  const that = this as any;

  that.cacheable && that.cacheable();
  const opts = getOptions(that) || {};
  const md = newMarkdown(Object.assign({}, opts, {
    html: true,
    xhtmlOut: true,
    breaks: true,
    linkify: true,
  }));

  const markdownSource = removeFrontMatter(that.resourcePath, source);
  const html = md.render(markdownSource)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/…/g, '...')
  ;
  if (template.indexOf(CHILDREN_PLACEHOLDER) === -1) {
    throw new Error(`template does not contain placeholder for children: ${CHILDREN_PLACEHOLDER}`);
  }
  const tsSource = template.replace(CHILDREN_PLACEHOLDER, html);

  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      allowJs: true,
      alwaysStrict: true,
      jsx: ts.JsxEmit.React,
      target: ts.ScriptTarget.ES5,
    },
    reportDiagnostics: true,
    fileName: that.resourcePath,
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
};

export default MarkdownLoader;

function newMarkdown(opts : any) {
  let md = new Markdown(opts);

  const plugins = opts.plugins = [];
  for (var i = 0 ; i < plugins.length; ++i) {
    md = md.use(plugins[i]);
  }
  return md;
}

function removeFrontMatter(path : string, source : string) {
  if (source.substring(0, 4) !== DELIMITER) {
    throw new Error(`Couldn't find front matter data at the beginning of ${
      path}; expected '---\\n'; got '${source.substring(0, 4)}'.`);
  }
  const end = source.indexOf(`\n${DELIMITER}`, 4);
  if (end === -1) {
    throw new Error(`Couldn't find end of front matter data in first ${
      MAX_FM_SIZE} bytes of ${path}.`);
  }
  return source.substring(end + 4);
}

function loadTemplate() {
  return readFileSync(path.join(__dirname, './MarkdownPage.tsx')).toString('utf8');
}

