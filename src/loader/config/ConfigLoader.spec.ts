
import * as sinon from 'sinon';
import * as should from 'should';
import FakePromise from 'fake-promise';

import { Paramorph, Layout, Include, Page, Tag, Collection, Config } from '../../model';

import { ConfigLoader } from './ConfigLoader';

describe('ConfigLoader', () => {
  const config : Config = {
    title: 'test',
    timezone: 'UTC',
    collections: {
      pages: {},
      posts: {},
    },
    baseUrl: 'http://paramorph.github.io/',
    image: '',
    locale: 'en_US',
    menu: [],
  };
  const mocks = {
    projectStructure: {
      scan: sinon.stub(),
    },
    frontMatter: {
      read: sinon.stub(),
    },
    pageFactory: {
      create: sinon.stub(),
    },
    contentLoader: {
      load: sinon.stub(),
    },
  };

  let testedLoader : ConfigLoader;
  let paramorph : Paramorph;

  beforeEach(() => {
    testedLoader = new ConfigLoader(
      mocks.projectStructure as any,
      mocks.frontMatter as any,
      mocks.pageFactory as any,
      mocks.contentLoader as any,
    );
  });
  afterEach(() => {
    mocks.projectStructure.scan.resetBehavior();
    mocks.projectStructure.scan.resetHistory();
    mocks.frontMatter.read.resetBehavior();
    mocks.frontMatter.read.resetHistory();
    mocks.pageFactory.create.resetBehavior();
    mocks.pageFactory.create.resetHistory();
    mocks.contentLoader.load.resetHistory();
  });

  const tagPage = {
    url: '/tag',
    tags: [],
    categories: [],
    output: false,
    collection: 'Pages',
  };

  describe('when loading empty project structure', () => {
    const struct = {
      layouts: [],
      includes: [],
      collections: [],
    };

    beforeEach(() => {
      mocks.projectStructure.scan.returns(FakePromise.resolve(struct));
    });

    it('.load() throws Error with complain about missing tag page', () => {
      testedLoader.load(config)
        .then(
          result => { throw new Error(`expected rejection; got ${JSON.stringify(result)}`); },
          error => error.message.should.eql('Couldn\'t find page of url \'/tag\' (used to render tag pages)'),
        )
      ;
    });
  });

  describe('when loading a project structure containing only tag page', () => {
    const struct = {
      layouts: [],
      includes: [],
      collections: [
        {
          name: 'pages',
          path: '_pages',
          files: [
            {
              name: 'tag',
              path: './_pages/tag.markdown',
            },
          ],
        },
      ],
    };

    beforeEach(async () => {
      mocks.projectStructure.scan.returns(FakePromise.resolve(struct));
      mocks.frontMatter.read.returns(FakePromise.resolve({}));
      mocks.pageFactory.create.returns(tagPage);
      paramorph = await testedLoader.load(config);
    });

    it('.load() returns empty Paramorph instance', () => {
      paramorph.layouts.should.eql({});
      paramorph.includes.should.eql({});
      paramorph.pages.should.eql({
        '/tag': tagPage,
      });
      paramorph.categories.should.eql({});
      paramorph.tags.should.eql({});
      paramorph.config.should.eql(config);
    });
  });

  describe('when loading a project structure containing only a page with missing category', () => {
    const struct = {
      layouts: [],
      includes: [],
      collections: [
        {
          name: 'pages',
          path: '_pages',
          files: [
            {
              name: 'tag',
              path: './_pages/tag.markdown',
            },
          ],
        },
      ],
    };

    beforeEach(() => {
      mocks.projectStructure.scan.returns(FakePromise.resolve(struct));
      mocks.frontMatter.read.returns(FakePromise.resolve({}));
      mocks.pageFactory.create.returns({ ...tagPage, categories: ['missing'] });
    });

    it('.load() throws Error', () => {
      testedLoader.load(config)
        .then(
          result => { throw new Error(`expected rejection; got result=${JSON.stringify(result)}`); },
          error => error.message.should.equal(
            'Couldn\'t find category page(s): [{"page":"/tag","category":"missing"}]'
          ),
        )
      ;
    });
  });

  describe('when loading a project structure containing layouts', () => {
    const struct = {
      layouts: [
        {
          name: 'default',
          path: './_layouts/default.ts',
        },
      ],
      includes: [],
      collections: [
        {
          name: 'pages',
          path: '_pages',
          files: [
            {
              name: 'tag',
              path: './_pages/tag.markdown',
            },
          ],
        },
      ],
    };

    beforeEach(async () => {
      mocks.projectStructure.scan.returns(FakePromise.resolve(struct));
      mocks.frontMatter.read.returns(FakePromise.resolve({}));
      mocks.pageFactory.create.returns(tagPage);
      paramorph = await testedLoader.load(config);
    });

    it('.load() returns Paramorph containing layouts', () => {
      Object.keys(paramorph.layouts).should.have.length(1);
      (paramorph.layouts['default'] as any).should.eql(new Layout('default', './_layouts/default.ts'));
    });
  });

  describe('when loading a project structure containing includes', () => {
    const struct = {
      layouts: [
      ],
      includes: [
        {
          name: 'Feed',
          path: './_includes/Feed.ts',
        },
      ],
      collections: [
        {
          name: 'pages',
          path: '_pages',
          files: [
            {
              name: 'tag',
              path: './_pages/tag.markdown',
            },
          ],
        },
      ],
    };

    beforeEach(async () => {
      mocks.projectStructure.scan.returns(FakePromise.resolve(struct));
      mocks.frontMatter.read.returns(FakePromise.resolve({}));
      mocks.pageFactory.create.returns(tagPage);
      paramorph = await testedLoader.load(config);
    });

    it('.load() returns Paramorph containing includes', () => {
      Object.keys(paramorph.includes).should.have.length(1);
      (paramorph.includes['Feed'] as any).should.eql(new Include('Feed', './_includes/Feed.ts'));
    });
  });

  describe('when loading a project structure containing page', () => {
    const tagSource = {
      name: 'tag',
      path: './_pages/tag.markdown',
    };
    const postSource = {
      name: 'hello-world',
      path: './_post/hello-world.md',
    };
    const struct = {
      layouts: [
      ],
      includes: [
      ],
      collections: [
        {
          name: 'pages',
          path: './_pages',
          files: [
            tagSource,
          ],
        },
        {
          name: 'posts',
          path: './_posts',
          files: [
            postSource,
          ],
        },
      ],
    };
    let matterPromise0 : FakePromise<any>;
    let matterPromise1 : FakePromise<any>;
    let paramorphPromise : Promise<Paramorph>;

    beforeEach(end => {
      mocks.projectStructure.scan.returns(FakePromise.resolve(struct));
      matterPromise0 = new FakePromise();
      matterPromise1 = new FakePromise();
      mocks.frontMatter.read.onCall(0).returns(matterPromise0);
      mocks.frontMatter.read.onCall(1).returns(matterPromise1);
      paramorphPromise = testedLoader.load(config);
      setImmediate(end);
    });

    it('calls frontMatter.read(...)', () => {
      mocks.frontMatter.read.should.have.callCount(2);
      mocks.frontMatter.read.should.have.been.calledWith(tagSource);
      mocks.frontMatter.read.should.have.been.calledWith(postSource);
    });

    describe('and after resolving frontMatter promise', () => {
      const matter0 = {
      };
      const matter1 = {
        title: 'Hello, World!',
        description: 'Just a first post.',
        tags: ['tag'],
      };
      const page0 = new Page(
        '/tag',
        'Tag',
        '',
        null,
        'Pages',
        'default',
        './_pages/tag.md',
        false,
        false,
        [],
        [],
        0,
      );
      const page1 = new Page(
        '/hello-world',
        'Hello, World!',
        'Just a first post.',
        null,
        'Posts',
        'default',
        './_post/hello-world.md',
        true,
        true,
        [],
        ['Tag'],
        0,
      );

      beforeEach(async () => {
        mocks.pageFactory.create.onCall(0).returns(page0);
        mocks.pageFactory.create.onCall(1).returns(page1);
        matterPromise0.resolve(matter0);
        matterPromise1.resolve(matter1);
        paramorph = await paramorphPromise;
      });

      it('calls pageFactory.create(...)', () => {
        mocks.pageFactory.create.should.have.callCount(2);

        const source0 = mocks.pageFactory.create.getCall(0).args[0];
        source0.should.eql(tagSource);
        const category0 = mocks.pageFactory.create.getCall(0).args[1];
        category0.title.should.equal('Pages');
        const actualMatter0 = mocks.pageFactory.create.getCall(0).args[2];
        actualMatter0.should.eql(matter0);

        const source1 = mocks.pageFactory.create.getCall(1).args[0];
        source1.should.eql(postSource);
        const category1 = mocks.pageFactory.create.getCall(1).args[1];
        category1.title.should.equal('Posts');
        const actualMatter1 = mocks.pageFactory.create.getCall(1).args[2];
        actualMatter1.should.eql(matter1);
      });

      it('calls contentLoader.load(...)', () => {
        mocks.contentLoader.load.should.have.callCount(1);
      });

      it('returns paramorph containing proper tag', () => {
        const tag = paramorph.tags['Tag'] as Tag;
        should.exist(tag);
        tag.title.should.equal('#Tag');
      });

      it('returns paramorph containing proper page', () => {
        const page = paramorph.pages['/hello-world'] as Page;
        should.exist(page);
        page.should.equal(page1);
      });

      it('returned tag contains proper page', () => {
        const tag = paramorph.tags['Tag'] as Tag;
        tag.pages.should.have.length(1);
        tag.pages[0].should.equal(page1);
      });
    });
  });
});

