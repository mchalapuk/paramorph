
import { readFileSync } from 'fs';

import { Paramorph, Layout, Post, Collection, Category, Tag } from '../../model';

import { rss } from './rss';

describe('rss', () => {
  const expectedCode = readFileSync(`${__dirname.replace('lib', 'src')}/rss.spec.output`)
    .toString('utf8')
  ;

  it('produces proper source', () => {
    const original = new Paramorph({ title: 'Test', baseUrl: 'http://example.com' } as any);
    original.addLayout(new Layout('default', './_layouts/default.ts'));
    original.addCollection(new Collection('pages', 'Pages', './_pages'));
    original.addCollection(new Collection('posts', 'Posts', './_posts'));
    original.addPost(new Post(
      '/',
      'Home',
      'This is a test post',
      'http://some.address/image.jpg',
      'Pages',
      'default',
      './index.markdown',
      true,
      false,
      5,
      ['Do It Yourself!'],
      ['exciting'],
      0,
    ));
    original.addPost(new Category(
      '/diy/:param/',
      'Do It Yourself!',
      'Yes, you can!',
      'http://some.address/diy.jpg',
      'Posts',
      'default',
      './diy.markdown',
      true,
      true,
      5,
      [],
      [],
      1,
    ));
    original.addPost(new Tag(
      '/tags/exciting/',
      'exciting',
      'This is an exciting tag.',
      'http://some.address/exciting.jpg',
      'default',
      './tag.markdown',
      true,
      5,
      2,
    ));
    original.addPost(new Post(
      '/post/',
      'Post',
      'This is a test post',
      'http://some.address/image.jpg',
      'Pages',
      'default',
      './index.markdown',
      true,
      false,
      5,
      ['Do It Yourself!'],
      ['exciting'],
      0,
    ));
    original.addPost(new Post(
      '/404/',
      'Not Found',
      'This is a test post',
      'http://some.address/image.jpg',
      'Pages',
      'default',
      './index.markdown',
      true,
      false,
      5,
      ['Do It Yourself!'],
      ['exciting'],
      0,
    ));

    const source = rss(original);
    source.should.equal(expectedCode);
  });
});

