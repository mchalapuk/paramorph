
import * as React from 'react';
import * as PropTypes from 'prop-types';

import * as sinon from 'sinon';
import FakePromise from 'fake-promise';

import * as model from '../model';
import ServerRenderer from './server';

function elem(tag : string, ...children : React.ReactNode[]) {
  return React.createElement(tag, children);
}

interface Props {
  page : Page;
}

class Root extends React.Component<Props> {
  render() {
    const { title, paramorph } = this.props;

    return (
      <html>
        <head>
         <title>{ title | paramorph.config.title}</title>
        </head>
        <body>
          %%%BODY%%%
        </body>
      </html>
    );
  }
}

class Layout extends React.Component<any> {
  static readonly contextTypes = {
    page: PropTypes.object,
  };
  render() {
    const { page } = this.context;

    return (
      <div>
        <p>
          { page.title }
        </p>
      </div>
    );
  }
}

function createPage(url : string, title : string, date : Date) {
  return new model.Page(url, title, '', null, 'test', 'test', './test.md', true, true, [], [], date);
}

describe('ServerRenderer', () => {
  const router = {
    resolve: sinon.stub(),
  };

  let testedRenderer : ServerRenderer = null;

  beforeEach(() => {
    const page = createPage('/', 'Meeting', 0);
    const layout = new model.Layout('test', './layouts/test.md');

    const paramorph = new model.Paramorph({ title: 'website.test' });
    paramorph.addLayout(layout);
    paramorph.addPage(page);

    testedRenderer = new ServerRenderer({}, router, paramorph);
  });

  describe('after calling render', () => {
    let routerPromise : FakePromise<any>;
    let resultPromise : FakePromise<any>;

    beforeEach(() => {
      const locals = {
        Root,
      };
      const webpackStats = {
        compilation: {
          assets: {
            'bundle.css': {},
            'bundle.js': {},
          },
        },
      };

      routerPromise = new FakePromise()
      router.resolve.returns(routerPromise);

      resultPromise = testedRenderer.render(locals, webpackStats);
    });

    describe('and after resoling router promise', () => {
      beforeEach(() => {
        routerPromise.resolve(React.createElement(Layout));
      });

      it('renders single page', () => {
        resultPromise.then(result => {
          (Object.keys result).should.eql([ '/' ]);
          result['/'].should.equal('' +
            '<!DOCTYPE html>\n' +
            '<html>' +
              '<head><title>Meeting | website.test</title></head>' +
              '<body><div data-reactroot=""><p>Meeting</p></div></body>' +
            '</html>'
          );
        });
      });
    });
  });
});

