
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { History, createMemoryHistory } from 'history';

import * as sinon from 'sinon';
import FakePromise from 'fake-promise';
import { JSDOM } from 'jsdom';

import * as model from '../model';
import { RootProps } from '../react';
import { ClientRenderer, Locals, HashMap, PostComponents } from '../boot';

function elem(tag : string, ...children : React.ReactNode[]) {
  return React.createElement(tag, children);
}

class LayoutComponent extends React.Component<{}> {
  render() {
    const { children } = this.props;

    return (
      <div className='layout'>
        { children }
      </div>
    );
  }
}

class PostComponent extends React.Component<{}> {
  static readonly contextTypes = {
    post: PropTypes.object,
  };
  render() {
    const { post } = this.context;

    return (
      <p>
        { post.title }
      </p>
    );
  }
}

function createPost(url : string, title : string, date : number) {
  return new model.Post(url, title, '', null, 'Test', 'test', './test.md', true, true, 5, [], [], date);
}

describe('ClientRenderer', () => {
  const mocks = {
    router: {
      resolve: sinon.stub(),
    },
  };

  const collection = new model.Collection('test', 'Test', './_test');
  const post = createPost('/', 'Meeting', 0);
  const layout = new model.Layout('test', './layouts/test.md');

  const paramorph = new model.Paramorph({ title: 'website.test' } as model.Config);
  paramorph.addLayout(layout);
  paramorph.addCollection(collection);
  paramorph.addPost(post);
  paramorph.addContentLoader(post.url, () => Promise.resolve(PostComponent));

  let container : HTMLElement;
  let history : History;

  let testedRenderer : ClientRenderer;

  before(() => {
    global.window = new JSDOM().window;
  });
  after(() => {
    global.window.close();
  });

  beforeEach(() => {
    history = createMemoryHistory();
    container = global.window.document.createElement('div');

    testedRenderer = new ClientRenderer(
      history,
      new model.PathParams(),
      mocks.router,
      paramorph,
    );
  });
  afterEach(() => {
    mocks.router.resolve.reset();
  });

  describe('after calling render', () => {
    let routerPromise : FakePromise<any>;
    let renderPromise : Promise<void>;

    beforeEach(() => {
      routerPromise = new FakePromise<PostComponents>();
      mocks.router.resolve.returns(routerPromise);

      renderPromise = testedRenderer.render(container, []);
    });

    describe('and after resoling router promise', () => {
      beforeEach(done => {
        routerPromise.resolve({
          LayoutComponent,
          PostComponent,
        });
        setImmediate(done);
      });

      it('renders single post', () => {
        return renderPromise.then(() => {
          const renderedHtml = container.innerHTML;

          renderedHtml.should.equal('<div class="layout"><p>Meeting</p></div>');
        });
      });
    });
  });
});

declare global {
  namespace NodeJS {
    interface Global {
      window : Window;
    }
  }
}

