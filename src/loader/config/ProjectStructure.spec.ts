
import FakeFileSystem from '../../platform/fake/FileSystem';
import { Config } from '../../model';

import ProjectStructure from './ProjectStructure';

describe('ProjectStructure', () => {
  let fs : FakeFileSystem;
  let testedStructure : ProjectStructure;

  beforeEach(() => {
    fs = new FakeFileSystem();
    testedStructure = new ProjectStructure(fs);
    fs.createDir('.');
  });

  describe('given empty project folder', () => {
    beforeEach(() => {
      fs.createDir('.');
    });

    it('.scan() complains about lack of _layouts folder', () => {
      testedStructure.scan({ collections: {} } as Config)
        .then(
          result => { throw new Error(`expected an error; got result ${result}`); },
          err => err.should.eql(new Error('couldn\'t find ./_layouts folder')),
        )
      ;
    });
  });

  describe('given project with only _layouts folder', () => {
    beforeEach(() => {
      fs.createDir('.');
      fs.createDir('./_layouts');
    });

    it('.scan() complains about lack of _includes folder', () => {
      testedStructure.scan({ collections: {} } as Config)
        .then(
          result => { throw new Error(`expected an error; got result ${result}`); },
          err => err.should.eql(new Error('couldn\'t find ./_includes folder')),
        )
      ;
    });
  });

  describe('given project with empty _layouts and _includes folders', () => {
    beforeEach(() => {
      fs.createDir('.');
      fs.createDir('./_layouts');
      fs.createDir('./_includes');
    });

    it('.scan() produces empty specialDirs', () => {
      const expectedResult = {
        layouts: [],
        includes: [],
        collections: [
          { name: '$root', path: '.', files: [] },
        ],
      };
      testedStructure.scan({ collections: {} } as Config)
        .then(result => result.should.eql(expectedResult))
      ;
    });

    it('.scan() doesn\'t throw when encountering collection without its folder', () => {
      testedStructure.scan({ collections: { nonexistent: {} } } as any);
    });

    [ 'layouts', 'includes', '$root' ].forEach(forbiddenName => {
      it(`.scan() complains about collection named '${forbiddenName}'`, () => {
        const collections : any = {};
        collections[forbiddenName] = {};
        testedStructure.scan({ collections } as Config)
          .then(
            result => { throw new Error(`expected an error; got result ${result}`); },
            err => err.should.eql(new Error(`collection name forbidden: '${forbiddenName}'`)),
          )
        ;
      });
    });
  });

  describe('given project with some layout files', () => {
    beforeEach(() => {
      fs.createDir('.');
      fs.createDir('./_layouts');
      fs.createDir('./_includes');

      fs.writeFile('./_layouts/js.js');
      fs.writeFile('./_layouts/ts.ts');
      fs.createDir('./_layouts/sub-js');
      fs.writeFile('./_layouts/sub-js/index.js');
      fs.createDir('./_layouts/sub-ts');
      fs.writeFile('./_layouts/sub-ts/index.ts');
    });

    it('.scan() produces specialDirs containing all layouts', () => {
      const expectedResult = {
        layouts: [
          { name: 'js', path: './_layouts/js.js' },
          { name: 'sub-js', path: './_layouts/sub-js/index.js' },
          { name: 'sub-ts', path: './_layouts/sub-ts/index.ts' },
          { name: 'ts', path: './_layouts/ts.ts' },
        ],
        includes: [],
        collections: [
          { name: '$root', path: '.', files: [] },
        ],
      };
      testedStructure.scan({ collections: {} } as Config)
        .then(result => result.should.eql(expectedResult))
      ;
    });
  });

  describe('given project with layout of 2 index files', () => {
    beforeEach(() => {
      fs.createDir('.');
      fs.createDir('./_layouts');
      fs.createDir('./_includes');

      fs.createDir('./_layouts/sub');
      fs.writeFile('./_layouts/sub/index.js');
      fs.writeFile('./_layouts/sub/index.ts');
    });

    it('.scan() complains about two index files', () => {
      testedStructure.scan({ collections: {} } as Config)
        .then(
          result => { throw new Error(`expected an error; got result ${result}`); },
          err => err.should.eql(new Error(
            'multiple index files found in subfolder: ./_layouts/sub: index.js,index.ts'
          )),
        )
      ;
    });
  });

  describe('given project with some includes', () => {
    beforeEach(() => {
      fs.createDir('.');
      fs.createDir('./_layouts');
      fs.createDir('./_includes');

      fs.writeFile('./_includes/js.js');
      fs.writeFile('./_includes/ts.ts');
      fs.createDir('./_includes/sub-js');
      fs.writeFile('./_includes/sub-js/index.js');
      fs.createDir('./_includes/sub-ts');
      fs.writeFile('./_includes/sub-ts/index.ts');
    });

    it('.scan() produces specialDirs containing all includes', () => {
      const expectedResult = {
        layouts: [],
        includes: [
          { name: 'js', path: './_includes/js.js' },
          { name: 'sub-js', path: './_includes/sub-js/index.js' },
          { name: 'sub-ts', path: './_includes/sub-ts/index.ts' },
          { name: 'ts', path: './_includes/ts.ts' },
        ],
        collections: [
          { name: '$root', path: '.', files: [] },
        ],
      };
      testedStructure.scan({ collections: {} } as Config)
        .then(result => result.should.eql(expectedResult))
      ;
    });
  });

  describe('given project with some markdown files in root folder', () => {
    beforeEach(() => {
      fs.createDir('.');
      fs.createDir('./_layouts');
      fs.createDir('./_includes');

      fs.writeFile('./index.markdown');
      fs.writeFile('./sitemap.markdown');
      fs.writeFile('./about.markdown');
      fs.writeFile('./404.markdown');
    });

    it('.scan() produces specialDirs containing markdown files in $root collection', () => {
      const expectedResult = {
        layouts: [],
        includes: [],
        collections: [
          {
            name: '$root',
            path: '.',
            files: [
              { name: '404', path: './404.markdown' },
              { name: 'about', path: './about.markdown' },
              { name: 'index', path: './index.markdown' },
              { name: 'sitemap', path: './sitemap.markdown' },
            ]
          },
        ],
      };
      testedStructure.scan({ collections: {} } as Config)
        .then(result => result.should.eql(expectedResult))
      ;
    });
  });

  describe('given project with some markdown files in _posts folder', () => {
    beforeEach(() => {
      fs.createDir('.');
      fs.createDir('./_layouts');
      fs.createDir('./_includes');
      fs.createDir('./_posts');

      fs.writeFile('./_posts/2007-06-01-hello-world.markdown');
      fs.writeFile('./_posts/2018-03-21-need-to-blog-more-often.markdown');
    });

    it('.scan() produces specialDirs containing markdown files in _posts collection', () => {
      const expectedResult = {
        layouts: [],
        includes: [],
        collections: [
          { name: '$root', path: '.', files: [] },
          {
            name: 'posts',
            path: './_posts',
            files: [
              {
                name: '2007-06-01-hello-world',
                path: './_posts/2007-06-01-hello-world.markdown',
              },
              {
                name: '2018-03-21-need-to-blog-more-often',
                path: './_posts/2018-03-21-need-to-blog-more-often.markdown',
              },
            ],
          },
        ],
      };
      testedStructure.scan({ collections: { posts: {} } } as any)
        .then(result => result.should.eql(expectedResult))
      ;
    });
  });
});

