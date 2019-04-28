
import FakeFileSystem from '../../platform/fake/FileSystem';
import FrontMatter from './FrontMatter';

const source = {
  name: 'file.markdown',
  path: 'file.markdown',
};

describe('FrontMatter,', () => {
  let fileSystem : FakeFileSystem;
  let testedFrontMatter : FrontMatter;

  beforeEach(() => {
    fileSystem = new FakeFileSystem();
    testedFrontMatter = new FrontMatter(fileSystem);
  });

  describe('when source file is not existent', () => {
    it('throws when reading a source file', () => {
      return testedFrontMatter.read(source)
        .then(
          result => { throw new Error(`expected rejection; got result ${result}`); },
          error => error.should.eql(new Error('no such file or directory: file.markdown')),
        )
      ;
    });
  });
  describe('when source file is empty', () => {
    beforeEach(() => {
      fileSystem.writeFile(source.path, '');
    });
    it('throws when reading a source file', () => {
      return testedFrontMatter.read(source)
        .then(
          result => { throw new Error(`expected rejection; got result ${result}`); },
          error => error.should.eql(new Error(
            `Couldn't find front matter data at the beginning of ${
              source.path}; expected '---\\n'; got ''.`,
          )),
        )
      ;
    });
  });
  describe('when source doesn\'t have closing front-matter delimiter', () => {
    beforeEach(() => {
      fileSystem.writeFile(source.path, '---\n\n');
    });
    it('throws when reading a source file', () => {
      return testedFrontMatter.read(source)
        .then(
          result => { throw new Error(`expected rejection; got result ${result}`); },
          error => error.should.eql(new Error(
            `Couldn't find end of front matter data in first 2048 bytes of ${source.path}.`,
          )),
        )
      ;
    });
  });
  describe('when source front-matter containes invalid yaml', () => {
    beforeEach(() => {
      fileSystem.writeFile(source.path, '---\n%#@$#$@L>><\n---\n');
    });
    it('throws when reading a source file', () => {
      return testedFrontMatter.read(source)
        .then(
          result => { throw new Error(`expected rejection; got result ${result}`); },
          error => error.name.should.equal('YAMLException'),
        )
      ;
    });
  });

  const preconditionTests : [string, any, string][] = [
    [
      'empty front matter',
      '---\n\n---\n',
      'posts[\'file.markdown\'].date must be a date string (got undefined)',
    ],
    [
      'date === \'jibberish\'',
      '---\ndate: jibberish\n---\n',
      'posts[\'file.markdown\'].date must be a date string (got \'jibberish\')',
    ],
    [
      'role of type number',
      '---\ndate: 2019-01-01\nrole: 0\n---\n',
      'posts[\'file.markdown\'].role must be \'post\' or \'category\' or undefined (got 0)',
    ],
    [
      'role === \'superhero\'',
      '---\ndate: 2019-01-01\nrole: \'superhero\'\n---\n',
      'posts[\'file.markdown\'].role must be \'post\' or \'category\' or undefined (got \'superhero\')',
    ],
    [
      'title of type boolean',
      '---\ndate: 2019-01-01\ntitle: true\n---\n',
      'posts[\'file.markdown\'].title must be a string or undefined (got true)',
    ],
    [
      'description === null',
      '---\ndate: 2019-01-01\ndescription: null\n---\n',
      'posts[\'file.markdown\'].description must be a string or undefined (got null)',
    ],
    [
      'permalink of type number',
      '---\ndate: 2019-01-01\npermalink: 3.1415\n---\n',
      'posts[\'file.markdown\'].permalink must be a string or undefined (got 3.1415)',
    ],
    [
      'layout of type number',
      '---\ndate: 2019-01-01\nlayout: -1\n---\n',
      'posts[\'file.markdown\'].layout must be a string or undefined (got -1)',
    ],
    [
      'image of type boolean',
      '---\ndate: 2019-01-01\nimage: false\n---\n',
      'posts[\'file.markdown\'].image must be a string or undefined (got false)',
    ],
    [
      'output of type number',
      '---\ndate: 2019-01-01\noutput: 12345\n---\n',
      'posts[\'file.markdown\'].output must be a boolean or undefined (got 12345)',
    ],
    [
      'categories of type number',
      '---\ndate: 2019-01-01\ncategories: 0\n---\n',
      'posts[\'file.markdown\'].categories[0] must be a string (got no array operator (0)) or posts[\'file.markdown\'].categories be undefined (got 0)',
    ],
    [
      'categories as array of numbers',
      '---\ndate: 2019-01-01\ncategories:\n  - 0\n---\n',
      'posts[\'file.markdown\'].categories[0] must be a string (got 0) or posts[\'file.markdown\'].categories be undefined (got [0])',
    ],
    [
      'category of type boolean',
      '---\ndate: 2019-01-01\ncategory: false\n---\n',
      'posts[\'file.markdown\'].category must be a string or undefined (got false)',
    ],
    [
      'tags of type number',
      '---\ndate: 2019-01-01\ntags: 0\n---\n',
      'posts[\'file.markdown\'].tags[0] must be a string (got no array operator (0)) or posts[\'file.markdown\'].tags be undefined (got 0)',
    ],
    [
      'tags as array of numbers',
      '---\ndate: 2019-01-01\ntags:\n  - 0\n---\n',
      'posts[\'file.markdown\'].tags[0] must be a string (got 0) or posts[\'file.markdown\'].tags be undefined (got [0])',
    ],
    [
      'feed of type number',
      '---\ndate: 2019-01-01\nfeed: 12345\n---\n',
      'posts[\'file.markdown\'].feed must be a boolean or undefined (got 12345)',
    ],
    [
      'limit of type string',
      '---\ndate: 2019-01-01\nlimit: \'5\'\n---\n',
      'posts[\'file.markdown\'].limit must be a number or undefined (got \'5\')',
    ],
  ];

  preconditionTests.forEach(params => {
    const [ argDesc, matterSource, expectedMessage ] = params;

    describe(`when source contains ${argDesc}`, () => {
      beforeEach(() => {
        fileSystem.writeFile(source.path, matterSource);
      });

      it('throws when calling .load(...)', () => {
        return testedFrontMatter.read(source)
          .then(
            result => { throw new Error(`expected rejection got result: ${JSON.stringify(result)}`) },
            error => error.message.should.equal(expectedMessage),
          )
        ;
      });
    });
  });

  describe('when source front-matter contains valid (minimal) front matter', () => {
    beforeEach(() => {
      fileSystem.writeFile(source.path, '---\ndate: 1970-01-01, 01:00:00 GMT+01:00\n---\n');
    });
    it('returns parsed front-matter', () => {
      return testedFrontMatter.read(source)
        .then(
          matter => matter.date.should.equal('1970-01-01, 01:00:00 GMT+01:00'),
        )
      ;
    });
  });

  describe('when source front-matter contains valid (full) front matter', () => {
    beforeEach(() => {
      fileSystem.writeFile(source.path, `---
date: 1970-01-01 00:00:00 UTC
role: category
permalink: /link
title: Title
description: d e s c r i p t i o n
image: ./image.jpg
layout: Custom
output: false
feed: false
limit: 10
---
`);
    });

    it('returns parsed front-matter', () => {
      return testedFrontMatter.read(source)
        .then(
          matter => {
            matter.date.should.equal('1970-01-01 00:00:00 UTC');
            (matter.role as string).should.equal('category');
            (matter.permalink as string).should.equal('/link');
            (matter.title as string).should.equal('Title');
            (matter.description as string).should.equal('d e s c r i p t i o n');
            (matter.image as string).should.equal('./image.jpg');
            (matter.layout as string).should.equal('Custom');
            (matter.output as boolean).should.equal(false);
            (matter.feed as boolean).should.equal(false);
            (matter.limit as number).should.equal(10);
          },
        )
      ;
    });
  });
});

