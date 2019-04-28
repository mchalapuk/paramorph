
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { History } from 'history';

import * as sinon from 'sinon';
import FakePromise from 'fake-promise';

import * as model from '../model';
import { RootProps } from '../react';
import { ServerRenderer, Locals, HashMap, PageComponents } from '../boot';

function elem(tag : string, ...children : React.ReactNode[]) {
  return React.createElement(tag, children);
}

class Root extends React.Component<RootProps> {
  render() {
    const { paramorph, page } = this.props;

    return (
      <html>
        <head>
         <title>{ page.title } | { paramorph.config.title }</title>
        </head>
        <body>
          %%%BODY%%%
        </body>
      </html>
    );
  }
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

class PageComponent extends React.Component<{}> {
  static readonly contextTypes = {
    page: PropTypes.object,
  };
  render() {
    const { page } = this.context;

    return (
      <p>
        { page.title }
      </p>
    );
  }
}

function createPage(url : string, title : string, date : number) {
  return new model.Page(url, title, '', null, 'Test', 'test', './test.md', true, true, 5, [], [], date);
}

describe('ServerRenderer', () => {
  const router = {
    resolve: sinon.stub(),
  };

  let testedRenderer : ServerRenderer;

  beforeEach(() => {
    const collection = new model.Collection('test', 'Test', './_test');
    const page = createPage('/', 'Meeting', 0);
    const layout = new model.Layout('test', './layouts/test.md');

    const paramorph = new model.Paramorph({ title: 'website.test' } as model.Config);
    paramorph.addLayout(layout);
    paramorph.addCollection(collection);
    paramorph.addPage(page);
    paramorph.addContentLoader(page.url, () => Promise.resolve(PageComponent))

    testedRenderer = new ServerRenderer({} as History, new model.PathParams, router, paramorph);
  });

  describe('after calling render', () => {
    let routerPromise : FakePromise<any>;
    let resultPromise : Promise<HashMap<string>>;

    beforeEach(() => {
      const locals = {
        Root,
      } as Locals;
      const webpackStats = {
        compilation: {
          assets: {
            'bundle.css': {},
            'bundle.js': {},
          },
        },
      };

      routerPromise = new FakePromise<PageComponents>();
      router.resolve.returns(routerPromise);

      resultPromise = testedRenderer.render(locals, webpackStats);
    });

    describe('and after resoling router promise', () => {
      beforeEach(() => {
        routerPromise.resolve({
          LayoutComponent,
          PageComponent,
        });
      });

      it('renders single page', () => {
        return resultPromise.then(result => {
          Object.keys(result)
            .should.eql([ '/' ])
          ;
          (result['/'] as any).should.equal('' +
            '<!DOCTYPE html>\n' +
            '<html>' +
              '<head><title>Meeting | website.test</title></head>' +
              '<body><div class="layout" data-reactroot=""><p>Meeting</p></div></body>' +
            '</html>'
          );
        });
      });
    });
  });
});

