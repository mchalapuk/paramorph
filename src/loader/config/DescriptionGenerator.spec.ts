
import { Page } from '../../model';

import  DescriptionGenerator from './DescriptionGenerator';

describe('config/DescriptionGenerator', () => {
  let testedGenerator : DescriptionGenerator;

  beforeEach(() => {
    testedGenerator = new DescriptionGenerator(5);
  });

  const contentTests = [
    [ 'plain text', 'plain text' ],
    [ '<span>inline tag</span>', 'inline tag' ],
    [ '<ul><li>one</li><lib>two</li></ul>', 'one two' ],
    [ '<p>I am first!</p><p>I&#x27;m second.</p>', 'I am first! I\'m second.' ],
  ];

  contentTests.forEach(([ arg, expectedDescription ]) => {
    it(`.generate('${arg}')`, () => {
      const actualDescription = testedGenerator.generate(arg, {} as any);
      actualDescription.should.equal(expectedDescription);
    });
  });

  it('respects sentence limit', () => {
    const arg = 'One. Two! Three? Four... Five. Six,';
    const expectedDescription = 'One. Two! Three? Four... Five.'
    const actualDescription = testedGenerator.generate(arg, {} as any);
    actualDescription.should.equal(expectedDescription);
  });
});

