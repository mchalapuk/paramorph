
import * as should from 'should';

import MarkdownCompiler from './MarkdownCompiler';

describe('markdown/MarkdownCompiler', () => {
  let testedCompiler : MarkdownCompiler;

  beforeEach(() => {
    testedCompiler = new MarkdownCompiler();
  });

  it('throws if front matter is not present', () => {
    should(() => testedCompiler.toHtml('', 'test.md'))
      .throw(`Couldn't find front matter data at the beginning of test.md; expected '---\\n'; got ''.`)
    ;
  });

  it('renders markdown', () => {
    const markdown = `---
front: matter
---

# Title

> quote

paragraph

* item`;

    const expectedHtml = `<h1>Title</h1>
<blockquote>
<p>quote</p>
</blockquote>
<p>paragraph</p>
<ul>
<li>item</li>
</ul>
`;

    const actualHtml = testedCompiler.toHtml(markdown, 'test.md');
    actualHtml.should.equal(expectedHtml);
  });

  it('leaves react tags untouched', () => {
    const markdown = `---
front: matter
---
<div>
  <Feed page={ page } />
</div>
`;

    const expectedHtml = `<div>
  <Feed page={ page } />
</div>
`;

    const actualHtml = testedCompiler.toHtml(markdown, 'test.md');
    actualHtml.should.equal(expectedHtml);
  });
});

