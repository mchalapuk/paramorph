
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server'

import * as sinon from 'sinon';

import ContentLimiter from './Content';

let key = 0;

function elem(name : string, ...children : React.ReactNode[]) {
  return React.createElement(
    name,
    { key: key++ },
    children.length === 0 ? undefined : (children.length === 1 ? children[0] : children),
  );
}

class TestComponent extends React.Component<{}> {
  render() {
    const { children } = this.props;

    return (
      <div className='test'>
        { children }
      </div>
    );
  }
}

describe('Content', () => {
  let props : any;
  let testedContent : ReactNode;

  beforeEach(() => {
    props = {
      limit: 1,
      respectLimit: true,
      test: true,
    };
  });

  const renderingTests : [string, ReactNode, string][] = [
    [
      'empty div',
      elem('div'),
      '<div></div>',
    ],
    [
      'a paragraph',
      elem('p', 'Lorem ipsum dolor sit amet.'),
      '<p>Lorem ipsum dolor sit amet.</p>',
    ],
    [
      "react component without children",
      elem TestComponent,
      "<div class=\"test\"></div>",
    ],
    [
      'react component with children',
      elem(TestComponent, elem('p', 'Luke, I\'m your father.')),
      '<div class="test"><p>Luke, I&#x27;m your father.</p></div>',
    ],
  ];

  renderingTests.forEach(params => {
    [ testName, children, expectedResult ] = params;

    it(`renders ${testName}`, () => {
      testedContent = React.createElement(ContentLimiter, props, children);

      const expected = `<div class=\"content\">${expectedResult}</div>`;
      const actual = ReactDOMServer.renderToStaticMarkup(testedContent);

      actual.should.equal(expected);
    });
  });

  const limitTests : [string, [ReactNode, string], string][] = [
    [
      'two sentences',
      [
        elem('p', elem('b', 'Ignorance'), ' is a lack of ', elem('a', 'knowledge'), '. '),
        'Knowledge is a lack of ignorance.',
      ]
      '<p><b>Ignorance</b> is a lack of <a>knowledge</a>.</p>',
    ],
    [
      'images',
      elem('div', elem('img'), elem('img'), elem('img')),
      '<div></div>',
    ],
  ];

  limitTests.forEach(params => {
    [ testName, children, expectedResult ] = params;

    describe(`when limiting ${testName}`, () => {
      beforeEach(() => {
        testedContent = React.createElement(ContentLimiter, props, children);
      });

      it('renders limited children', () => {
        const expected = `<div class="content">${expectedResult}</div>`;
        const actual = ReactDOMServer.renderToStaticMarkup(testedContent);

        actual.should.equal(expected);
      });
    });
  });

  describe('with mapper configured', () => {
    let mapper : (node : React.ReactNode) => React.ReactNode;
    let testedContent : React.ReactNode;

    beforeEach(() => {
      mapper = sinon.spy(node => elem('strong', 'mapped'));
      props = { mapper, ...props };
    });

    it('maps root component', () => {
      const children = elem('p', 'root');
      const testedContent = React.createElement(ContentLimiter, props, children);

      const expected = '<div class="content"><strong>mapped</strong></div>';
      const actual = ReactDOMServer.renderToStaticMarkup testedContent;

      actual.should.equal(expected);
    });

    it('maps children with mapper before parents', () => {
      const children = elem('p', elem('b', 'Ignorance'), ' is a lack of elem knowledge.');
      const testedContent = React.createElement(ContentLimiter, props, children);

      ReactDOMServer.renderToStaticMarkup(testedContent);

      mapper.getCall(0).args[0].type.should.equal('b');
      mapper.getCall(1).args[0].type.should.equal('p');
    });

    it('maps components after limiting', () => {
      const children = elem('p', '.', elem('b', 'To be limited'), '.');
      const testedContent = React.createElement(ContentLimiter, props, children);

      ReactDOMServer.renderToStaticMarkup(testedContent);

      mapper.should.have.callCount(1);
    });
  });
});

