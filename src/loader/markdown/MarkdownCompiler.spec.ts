
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

> I'm quite into the French way - simple elegance
> with just a suggestion of sexiness, nothing vulgar.
>
> Michelle Dockery

Welcome to [Paramorph][address]
the best static webpost generator out there.

[address]: http://paramorph.org/

* item`;

    const expectedHtml = `<h1>Title</h1>
<blockquote>
<p>I'm quite into the French way - simple elegance
with just a suggestion of sexiness, nothing vulgar.</p>
<p>Michelle Dockery</p>
</blockquote>
<p>Welcome to <a href="http://paramorph.org/">Paramorph</a>
the best static webpost generator out there.</p>
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
  <Feed post={ post } />
</div>
`;

    const expectedHtml = `<div>
  <Feed post={ post } />
</div>
`;

    const actualHtml = testedCompiler.toHtml(markdown, 'test.md');
    actualHtml.should.equal(expectedHtml);
  });
});

