
import * as should from 'should';

import { Paramorph } from '../../model';
import ComponentTemplate from './ComponentTemplate';

describe('markdown/ComponentTemplate', () => {
  let testedTemplate : ComponentTemplate;

  beforeEach(() => {
    testedTemplate = new ComponentTemplate('<h1><%= paramorph.title %></h1><div><%- html %></div>');
  });

  it('properly compiles', () => {
    const result = testedTemplate.compile('<a>link</a>', { title: 'test' } as any);
    result.should.equal('<h1>test</h1><div><a>link</a></div>');
  });
});

