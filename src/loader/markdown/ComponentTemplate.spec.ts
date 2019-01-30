
import * as should from 'should';

import ComponentTemplate from './ComponentTemplate';

describe('markdown/ComponentTemplate', () => {
  it('throws when created with a template without a content placeholder', () => {
    should(() => new ComponentTemplate(''))
      .throw('template does not contain placeholder for children: { PLACEHOLDER }')
    ;
  });

  describe('after creation', () => {
    let testedTemplate : ComponentTemplate;

    beforeEach(() => {
      testedTemplate = new ComponentTemplate('<div>{ PLACEHOLDER }</div>');
    });

    it('properly compiles', () => {
      const result = testedTemplate.compile('<a>link</a>');
      result.should.equal('<div><a>link</a></div>');
    });
  });
});

