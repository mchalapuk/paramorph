
import { readFileSync } from 'fs';

import { Paramorph, Layout, Include, Page, Category, Tag } from '..';
import { uneval } from './uneval';

describe('uneval', () => {
  const expectedCode = readFileSync(`${__dirname.replace('lib', 'src')}/uneval.spec.output`)
    .toString('utf8')
  ;

  it('produces proper source', () => {
    const original = new Paramorph({ title: 'Test' });
    original.addLayout(new Layout('default', './_layouts/default.ts'));
    original.addInclude(new Include('BreadCrumbs', './_includes/BreadCrumbs/index.ts'));
    original.addPage(new Page(
      '/',
      'Home',
      'This is a test page',
      'http://some.address/image.jpg',
      'pages',,
      'default',
      './index.markdown',
      true,
      false,
      ['Do It Yourself!'],
      ['exciting'],
      0,
    ));
    original.addPage(new Category(
      '/diy',
      'Do It Yourself!',
      'Yes, you can!',
      'http://some.address/diy.jpg',
      'posts',,
      'default',
      './diy.markdown',
      true,
      true,
      [],
      [],
      1,
    ));
    original.addPage(new Tag(
      'exciting',
      'This is an exciting tag.',
      'http://some.address/exciting.jpg',
      'default',
      './tag.markdown',
      true,
      2,
    ));

    const source = uneval(original);
    source.should.equal(expectedCode);
  });
});

