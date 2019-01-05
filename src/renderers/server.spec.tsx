
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { History } from 'history';

import * as sinon from 'sinon';
import FakePromise from 'fake-promise';

import { Config } from '../config';
import * as model from '../model';
import { ServerRenderer, Locals, HashMap } from './server';
import { RootProps } from '../components/Root';

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

interface Props {
  page : model.Page;
}

class Layout extends React.Component<Props> {
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

function createPage(url : string, title : string, date : number) {
  return new model.Page(url, title, '', null, 'test', 'test', './test.md', true, true, [], [], date);
}

describe('ServerRenderer', () => {
  const router = {
    resolve: sinon.stub(),
  };

  let testedRenderer : ServerRenderer;

  beforeEach(() => {
    const page = createPage('/', 'Meeting', 0);
    const layout = new model.Layout('test', './layouts/test.md');

    const paramorph = new model.Paramorph({ title: 'website.test' } as Config);
    paramorph.addLayout(layout);
    paramorph.addPage(page);

    testedRenderer = new ServerRenderer({} as History, router, paramorph);
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

      routerPromise = new FakePromise()
      router.resolve.returns(routerPromise);

      resultPromise = testedRenderer.render(locals, webpackStats);
    });

    describe('and after resoling router promise', () => {
      beforeEach(() => {
        routerPromise.resolve(React.createElement(Layout));
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
              '<body><div data-reactroot=""><p>Meeting</p></div></body>' +
            '</html>'
          );
        });
      });
    });
  });
});

