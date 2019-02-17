
import * as should from 'should';

import { Paramorph } from '../../model';
import ComponentTemplate from './ComponentTemplate';

describe('markdown/ComponentTemplate', () => {
  let testedTemplate : ComponentTemplate;

  beforeEach(() => {
    testedTemplate = new ComponentTemplate(
      '<h1><%= title %></h1><div><%- html %></div>',
      { title: 'test' },
    );
  });

  it('properly compiles', () => {
    const result = testedTemplate.compile('<a>link</a>');
    result.should.equal('<h1>test</h1><div><a>link</a></div>');
  });
});

