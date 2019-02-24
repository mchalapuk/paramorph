
import Registry from 'offensive/Registry';
import { Assertion, Result, StandardMessage } from 'offensive/model';

declare module "offensive/Builder" {
  interface AssertionBuilder<T> {
    aDateString : OperatorBuilder<T>;
  }
}

export class DateStringAssertion implements Assertion {
  assert(value : any, name : string) : Result {
    return {
      get success() {
        return !Number.isNaN(Date.parse(value));
      },
      get message() {
        return new StandardMessage(name, 'be a date string', value);
      },
    };
  }
}

Registry.instance.addAssertion({
  aDateString: new DateStringAssertion(),
});

